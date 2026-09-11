---
title: "Lokální Redis"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 5
audience: ["admin","ai"]
tags: ["redis"]
---

# Lokální Redis

## K čemu slouží

Nainstaluj redis-server pro lokální cache a queue.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Nainstaluj redis-server pro lokální cache a queue
2. Neotvírej Redis veřejné síti
3. Pokud použiješ ACL, doplň credentials bezpečně do aplikace, ne do návodu

~~~bash
sudo apt-get install redis-server
sudo systemctl enable --now redis-server
redis-cli ping
~~~

## Ověření výsledku

Lokální PING odpoví PONG; pteroq běží.

## Související návody

[Kategorie a navazující návody](index.md)
