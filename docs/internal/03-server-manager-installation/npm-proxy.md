---
title: "Panel za NPM"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 16
audience: ["admin","ai"]
tags: ["npm-proxy"]
---

# Panel za NPM

## K čemu slouží

V NPM vytvoř panel.diamondcrew.net.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. V NPM vytvoř panel.diamondcrew.net
2. HTTP upstream je hostová dosažitelná adresa a ověřený lokální nginx port
3. Přidej TLS a Force SSL
4. Nastav trusted proxy v Panelu podle konkrétní sítě

~~~bash
curl -I https://panel.diamondcrew.net
~~~

## Ověření výsledku

Žádná redirect smyčka; aplikace generuje HTTPS odkazy.

## Související návody

[Kategorie a navazující návody](index.md)
