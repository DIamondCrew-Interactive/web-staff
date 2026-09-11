---
title: "Instalace Wings 1.13.3 za NPM"
category: 04-wings
categoryTitle: "Wings"
order: 258
audience: ["admin","ai"]
tags: []
---

# Instalace Wings 1.13.3 za NPM

## Účel a použití
Připojit DIA-01 jako herní node s Wings 1.13.3. Pro admina/AI s root/sudo, přístupem do Panelu a zálohou předchozí konfigurace.

## Kde a jak běží
Panel 1.15.1 řídí Wings. Veřejné https://dia-01.diamondcrew.net přijímá NPM na 443. Wings lokálně poslouchá HTTP 0.0.0.0:8443; SFTP 2022; volumes /var/lib/pterodactyl/volumes. Čísla jsou DiamondCrew konvence.

## Než začneš
Dokonči Docker installation. Zkontroluj volné porty, DNS a síťové rozsahy. Na novém stroji nekopíruj 172.19.0.0/16 bez inspectu.
~~~bash
uname -m
docker version
ss -ltnp
docker network inspect $(docker network ls -q) --format '{{.Name}} -> {{range .IPAM.Config}}{{.Subnet}}{{end}}'
~~~

## Proměnné a zástupné hodnoty
FQDN pro DIA-01 je dia-01.diamondcrew.net. Nový host dostane vlastní jméno a konfiguraci. Node token = `<configure-securely>`; do příkazů/chat logu se nevkládá.

## Instalace
Vyber správný release asset podle architektury; URL ani checksum neodhaduj. Pokud GitHub release neposkytne digest, před pokračováním zajisti schválený SHA256 jiným důvěryhodným kanálem.
~~~bash
case "$(uname -m)" in
  x86_64) wings_asset=wings_linux_amd64 ;;
  aarch64) wings_asset=wings_linux_arm64 ;;
  *) printf 'Unsupported architecture: verify official release\n'; exit 1 ;;
esac
curl -fsSL https://api.github.com/repos/pterodactyl/wings/releases/tags/v1.13.3 -o /tmp/dc-wings-release.json
wings_url=$(jq -er --arg name "$wings_asset" '.assets[] | select(.name==$name) | .browser_download_url' /tmp/dc-wings-release.json)
wings_hash=$(jq -er --arg name "$wings_asset" '.assets[] | select(.name==$name) | .digest | select(startswith("sha256:")) | sub("^sha256:"; "")' /tmp/dc-wings-release.json) || exit 1
curl -fL "$wings_url" -o /tmp/dc-wings
printf '%s  %s\n' "$wings_hash" /tmp/dc-wings | sha256sum --check - || exit 1
sudo install -m 755 /tmp/dc-wings /usr/local/bin/wings
sudo install -d -m 700 /etc/pterodactyl
~~~

## Konfigurace
Panel Admin → Locations (pokud chybí) → Nodes → Create New. Zadej reálné memory/disk a FQDN. Pro veřejné připojení klientů přes NPM musí Panel používat HTTPS a veřejný daemon port 443 / behind proxy. Na hostu uprav generovaný Wings config pro interní HTTP port 8443 a vypnuté lokální TLS. Tyto dvě vrstvy nejsou stejný listener. Zachovej vygenerovanou identitu a remote Panel URL.

Soubor /etc/pterodactyl/config.yml přenes bezpečně. Nevypisuj jej do logu. Data root a SFTP nastav podle inventáře; nezakládej druhý node stejnou identitou. Schéma vždy porovnej s generovaným configem cílové verze.

Vytvoř /etc/systemd/system/wings.service:
~~~ini
[Unit]
Description=DiamondCrew Wings
After=docker.service network-online.target
Requires=docker.service
Wants=network-online.target
[Service]
User=root
WorkingDirectory=/etc/pterodactyl
ExecStart=/usr/local/bin/wings
Restart=on-failure
RestartSec=5
LimitNOFILE=4096
[Install]
WantedBy=multi-user.target
~~~
~~~bash
sudo chmod 600 /etc/pterodactyl/config.yml
sudo systemctl daemon-reload
sudo systemctl enable --now wings
~~~

## Síť, DNS a reverse proxy
A dia-01 → 51.254.46.124. NPM Proxy Host: dia-01.diamondcrew.net, HTTP, host reachable address, port8443, WebSockets, Let's Encrypt, Force SSL. NPM container localhost není host. Omez přístup na 8443 firewallovým pravidlem pro oprávněné upstream klienty; game TCP/UDP a SFTP mají vlastní pravidla.

## Ověření výsledku
~~~bash
/usr/local/bin/wings version
systemctl status wings docker --no-pager
ss -ltnp
curl -I https://dia-01.diamondcrew.net
~~~
Chrání-li endpoint autentizace, anonymous 401 může potvrdit dosažitelnost, ale ne plnou funkčnost. V Panelu ověř node, přidej volné allocations, vytvoř testovací server a proveď install/start/stop, console a SFTP test.

## Záloha, aktualizace a rollback
Uchovej binárku, konfiguraci v secure backupu a konzistentní game data. Výměnu binary proveď v údržbě. Při regresi vrať kompatibilní binárku/config; při změně síťového modelu vrať i odpovídající IPAM konfiguraci. Nikdy nespouštěj dvě aktivní identity nad stejnými volumes.

## Řešení problémů
Pool overlaps: zkontroluj sítě, vyber volný subnet, změň pouze dotčenou konfiguraci v údržbě. Node offline: proces, DNS/TLS/proxy nebo chybná identita. Exit127 hry neznamená automaticky rozbitý Wings.

## Související návody
[Docker install](../14-docker/install.md)
[Pool overlaps](pool-overlaps.md)
[Official Wings install](https://pterodactyl.io/wings/1.0/installing.html)
