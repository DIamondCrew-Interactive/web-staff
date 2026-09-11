---
title: "Přehled služeb"
category: 01-getting-started
categoryTitle: "Začínáme"
order: 114
audience: ["admin","ai"]
tags: ["service-map"]
---

# Přehled služeb

## K čemu slouží

Panel: /var/www/pterodactyl, PHP 8.3, MariaDB panel, Redis, pteroq.service.

## Kde a jak běží

Inventář, architektura a pravidla DiamondCrew.

## Postup

1. Panel: /var/www/pterodactyl, PHP 8.3, MariaDB panel, Redis, pteroq.service
2. Wings: /usr/local/bin/wings, /etc/pterodactyl/config.yml, wings.service
3. NPM: nginx-proxy-manager_app_1
4. Cockpit: cockpit.socket

~~~bash
systemctl status nginx php8.3-fpm mariadb redis-server pteroq wings cockpit.socket --no-pager
~~~

## Ověření výsledku

Každý zásah má určený host, službu a datový adresář.

## Související návody

[Kategorie a navazující návody](index.md)
