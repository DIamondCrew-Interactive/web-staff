---
title: "Subdoména do složky: example.pmrp.cz"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 260
audience: ["admin","ai"]
tags: []
---

# Subdoména do složky: example.pmrp.cz

## Účel a použití
Admin publikuje statický adresář /var/www/example.pmrp.cz přes local nginx a NPM. Uživatel dostane HTTPS URL, nemusí znát filesystem.

## Kde a jak běží
Browser → DNS → DIA-01:443 → NPM → local nginx:8081 → /var/www/example.pmrp.cz → index.html. DNS pouze ukazuje adresu; nginx vybírá root; NPM řeší vnější TLS. Docker container a host mají odlišný localhost.

## Předpoklady a proměnné
Doména example.pmrp.cz je neutrální příklad. A example → 51.254.46.124. Port8081 je pouze příklad: nejprve ověř dostupnost a nekolidující vhost. Nemaž existující web root.

## Instalace
~~~bash
ss -ltnp
sudo mkdir -p /var/www/example.pmrp.cz
printf '<!doctype html><html lang="cs"><title>Example</title><h1>DiamondCrew example</h1></html>\n' | sudo tee /var/www/example.pmrp.cz/index.html >/dev/null
sudo chown -R www-data:www-data /var/www/example.pmrp.cz
sudo find /var/www/example.pmrp.cz -type d -exec chmod 755 {} \;
sudo find /var/www/example.pmrp.cz -type f -exec chmod 644 {} \;
~~~

## Konfigurace
/etc/nginx/sites-available/example.pmrp.cz:
~~~nginx
server {
    listen 8081;
    server_name example.pmrp.cz;
    root /var/www/example.pmrp.cz;
    index index.html;
    location / { try_files $uri $uri/ =404; }
    location ~ /\. { deny all; }
}
~~~
~~~bash
sudo ln -s /etc/nginx/sites-available/example.pmrp.cz /etc/nginx/sites-enabled/example.pmrp.cz
sudo nginx -t
sudo systemctl reload nginx
curl -I -H 'Host: example.pmrp.cz' http://127.0.0.1:8081
~~~

## Síť, DNS a reverse proxy
DNS A example → 51.254.46.124. NPM Domain example.pmrp.cz; Scheme http; Forward host je host reachable address; Port8081 (pokud byl ověřen). NPM musí host dosáhnout; nepoužívej uvnitř jeho containeru 127.0.0.1 jako adresu DIA-01. HTTP listener omez firewallově na potřebný přístup.

SSL → Request Let's Encrypt → Force SSL. Před vydáním certifikátu ověř DNS a challenge reachability.

## Ověření výsledku
~~~bash
dig +short example.pmrp.cz A
curl -I https://example.pmrp.cz
curl -I https://example.pmrp.cz/does-not-exist
~~~
První vrací správný obsah/200, neexistující cesta 404. Veřejné HTTPS kontroluj bez -k.

## Záloha, aktualizace a rollback
Před změnou obsahu uchovej původní root a vhost. Publikuj kontrolovanou sadu veřejných souborů; nikdy .env/.git. Při regresi vrať obsah/vhost, proveď nginx -t a reload. DNS vracej jen pokud se měnil cíl.

## Řešení problémů a další návody
404: Host/root/path; 403: index/permissions; 502: upstream. [DNS verification](../09-dns-https/verify.md), [NPM host service](../07-nginx-proxy-manager/host-service.md).
