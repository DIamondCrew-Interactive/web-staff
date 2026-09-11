---
title: "Lokální nginx pro panel"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 15
audience: ["admin","ai"]
tags: ["local-nginx"]
---

# Lokální nginx pro panel

## K čemu slouží

Web root musí být /var/www/pterodactyl/public, ne kořen aplikace.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Web root musí být /var/www/pterodactyl/public, ne kořen aplikace
2. Použij PHP FPM socket a Laravel try_files
3. Zvol volný interní HTTP port a dovol přístup NPM

~~~bash
sudo nginx -t
sudo systemctl reload nginx
ss -ltnp
~~~

## Ověření výsledku

Lokální request se správným Host i veřejný HTTPS login fungují.

## Související návody

[Kategorie a navazující návody](index.md)
