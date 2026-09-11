---
title: "Fresh install: Debian to DiamondCrew Server Manager"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 257
audience: ["admin","ai"]
tags: []
---

# Fresh install: Debian to DiamondCrew Server Manager

## Purpose
Čistý Debian 12 → Panel 1.15.1/PHP 8.3 → fungující panel.diamondcrew.net → Wings test server → DiamondCrew branding. Postup je pro nový prázdný host, nikoliv přepsání existující instalace.

## Audience
Infrastrukturní administrátor / AI s potvrzenou změnou. Nejde o klientský návod běžného hráče.

## Architecture
DIA-01 = dc-node01, 51.254.46.124. NPM drží veřejné 80/443. Lokální nginx obsluhuje /var/www/pterodactyl/public a PHP 8.3 FPM. MariaDB schema panel, lokální Redis, pteroq.service a cron jsou nutné součásti. Wings je samostatný agent.

## Prerequisites
SSH/recovery, sudo, volný disk, přidělená doména a plán firewallu. Pokud již existuje DB panel nebo /var/www/pterodactyl/.env, ZASTAV a použij update/restore, ne fresh install. Backup a návratový snapshot připrav i před bootstrapem hostu.

## Variables / placeholders
DB password = `<database-password>`, šifrovací klíč = `<app-key>`, neznámý SMTP = `<configure-for-target-environment>`. Hodnoty zadávej v neveřejném interaktivním prostředí. Příklad lokálního panel listeneru níže je 8082: není inventářní údaj ani obecný requirement; před použitím ověř ss -ltnp a firewall.

## Installation
1. Potvrď OS a nainstaluj základní nástroje. Po případném rebootu znovu ověř SSH.
~~~bash
cat /etc/os-release
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install ca-certificates curl gnupg lsb-release unzip tar git jq sudo
ss -ltnp
~~~
2. Debian 12 potřebuje pro cílové PHP 8.3 schválený externí repozitář. Následuje Sury keyring a repository, ne Ubuntu PPA.
~~~bash
curl -fsSL https://packages.sury.org/debsuryorg-archive-keyring.deb -o /tmp/dc-php-keyring.deb
sudo dpkg -i /tmp/dc-php-keyring.deb
printf 'deb [signed-by=/usr/share/keyrings/debsuryorg-archive-keyring.gpg] https://packages.sury.org/php/ %s main\n' "$(lsb_release -sc)" | sudo tee /etc/apt/sources.list.d/php.list >/dev/null
sudo apt-get update
sudo apt-get install php8.3-cli php8.3-fpm php8.3-common php8.3-gd php8.3-mysql php8.3-mbstring php8.3-bcmath php8.3-xml php8.3-curl php8.3-zip mariadb-server redis-server nginx composer
php -v
php -m
composer --version
sudo systemctl enable --now mariadb redis-server php8.3-fpm
~~~
Composer musí být v2. Pokud vybraný balíček nevyhovuje lockfile, použij aktuální ověřený postup getcomposer.org, ne vložený zastaralý installer hash.

3. Získej přesný release asset z GitHub API, ne odhadnutou download URL. Release API při ověření 2026-09-11 potvrzuje tag v1.15.1. Pokud digest chybí, vyžádej schválený checksum a před rozbalením ho ověř; nepokračuj automaticky.
~~~bash
curl -fsSL https://api.github.com/repos/pterodactyl/panel/releases/tags/v1.15.1 -o /tmp/dc-panel-release.json
asset_url=$(jq -er '.assets[] | select(.name=="panel.tar.gz") | .browser_download_url' /tmp/dc-panel-release.json)
asset_hash=$(jq -er '.assets[] | select(.name=="panel.tar.gz") | .digest | select(startswith("sha256:")) | sub("^sha256:"; "")' /tmp/dc-panel-release.json) || exit 1
curl -fL "$asset_url" -o /tmp/dc-panel.tar.gz
printf '%s  %s\n' "$asset_hash" /tmp/dc-panel.tar.gz | sha256sum --check - || exit 1
tar -tzf /tmp/dc-panel.tar.gz | head
sudo mkdir -p /var/www/pterodactyl
sudo tar -xzf /tmp/dc-panel.tar.gz -C /var/www/pterodactyl
cd /var/www/pterodactyl
sudo cp .env.example .env
sudo chown -R www-data:www-data /var/www/pterodactyl
sudo -u www-data composer install --no-dev --optimize-autoloader
~~~

## Configuration
4. V privátní MariaDB relaci vytvoř DB a uživatele. Nahraď placeholder bezpečně; nesdílej history výpis ani skutečné heslo. Aplikační grant nepotřebuje právo delegovat oprávnění jiným účtům.
~~~sql
CREATE DATABASE panel;
CREATE USER 'pterodactyl'@'127.0.0.1' IDENTIFIED BY '<database-password>';
GRANT ALL PRIVILEGES ON panel.* TO 'pterodactyl'@'127.0.0.1';
~~~
5. Pouze nová prázdná instalace generuje nový APP_KEY. Při obnově se musí použít původní klíč ze secure backupu; jeho ztráta není řešitelná novým key:generate.
~~~bash
cd /var/www/pterodactyl
sudo -u www-data php artisan key:generate --force
sudo -u www-data php artisan p:environment:setup
sudo -u www-data php artisan p:environment:database
sudo -u www-data php artisan p:environment:mail
sudo -u www-data php artisan migrate --seed --force
sudo -u www-data php artisan p:user:make
sudo chmod 640 .env
sudo chmod -R u+rwX,g+rX,o-rwx storage bootstrap/cache
~~~
App URL nastav https://panel.diamondcrew.net, DB panel na lokálním MariaDB, Redis lokální a email dle skutečné konfigurace. Env a klíč zazálohuj mimo server bez vypsání do sdíleného logu.

6. Vytvoř /etc/systemd/system/pteroq.service:
~~~ini
[Unit]
Description=DiamondCrew Panel queue worker
After=network.target redis-server.service mariadb.service
Requires=redis-server.service
[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/pterodactyl
ExecStart=/usr/bin/php /var/www/pterodactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
Restart=always
RestartSec=5
[Install]
WantedBy=multi-user.target
~~~
~~~bash
sudo systemctl daemon-reload
sudo systemctl enable --now pteroq
sudo crontab -u www-data -e
~~~
Do cronu vlož právě jednou:
~~~cron
* * * * * /usr/bin/php /var/www/pterodactyl/artisan schedule:run >> /dev/null 2>&1
~~~

## Networking / local nginx
NPM používá veřejný port 80, proto lokální nginx nesmí současně zabírat stejný listener. Na novém hostu zkontroluj default site a konflikt vyřeš cíleně před startem; nemaž ostatní vhosty. Příklad /etc/nginx/sites-available/pterodactyl:
~~~nginx
server {
    listen 8082;
    server_name panel.diamondcrew.net;
    root /var/www/pterodactyl/public;
    index index.php;
    client_max_body_size 100m;
    location / { try_files $uri $uri/ /index.php?$query_string; }
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_param HTTP_PROXY "";
    }
    location ~ /\. { deny all; }
}
~~~
~~~bash
sudo ln -s /etc/nginx/sites-available/pterodactyl /etc/nginx/sites-enabled/pterodactyl
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
curl -I -H 'Host: panel.diamondcrew.net' http://127.0.0.1:8082
~~~
Port 8082 je příklad, firewall dovolí pouze potřebný NPM přístup. Trusted proxies v Panelu nastav podle skutečných NPM síťových adres; nevěř libovolným proxy hlavičkám z internetu.

## DNS / Reverse Proxy
A panel → 51.254.46.124. Dokonči Docker a NPM install z navazujících návodů. NPM Forward: http, host reachable address (ne NPM localhost), zvolený nginx port. Vyžádej certifikát, Force SSL a ověř login. Neznámý lokální nginx port se nezaměňuje s veřejným 443.

## Verification
~~~bash
systemctl is-active nginx php8.3-fpm mariadb redis-server pteroq
redis-cli ping
curl -I https://panel.diamondcrew.net
~~~
Přihlas prvního admina. Založ Location, DIA-01 node podle Wings guide, skutečné allocations, existující ověřený Egg a testovací DEV server. Otestuj instalaci, start/stop, console a soubory. Potom aplikuj schválený DiamondCrew reskin pro 1.15.1 a test zopakuj; reskin není úplný backend installer.

## Backup / Update / Rollback
Před jakýmkoliv upgradem zachovej DB dump, provozní env v secure backupu, release a branding manifest. Upgrade nejprve na DEV. V případě regrese obnov stejnou generaci aplikace/DB/config, nikoliv pouze staré PHP soubory nad novým schematem.

## Troubleshooting
502: nginx/FPM/upstream. 500: Laravel/DB/config. Chybějící akce: pteroq/Redis/scheduler. Node offline: Wings/proxy/TLS/identita. Nikdy neopravuj existující šifrovanou DB novým klíčem.

## Related pages
[Docker installation](../14-docker/install.md)
[Wings installation](../04-wings/install.md)
[NPM Compose](../07-nginx-proxy-manager/compose.md)
[Reskin](reskin.md)
[Official Panel install](https://pterodactyl.io/panel/1.0/getting_started.html)
[Sury PHP source](https://packages.sury.org/php/README.txt)
