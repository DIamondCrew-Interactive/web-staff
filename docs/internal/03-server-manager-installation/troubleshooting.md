---
title: "Řešení problémů panelu"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 27
audience: ["admin","ai"]
tags: ["troubleshooting"]
---

# Řešení problémů panelu

## K čemu slouží

Urči, zda chyba nastává v NPM, nginx, PHP nebo Laravel.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Urči, zda chyba nastává v NPM, nginx, PHP nebo Laravel
2. 502 řeš přes upstream reachability
3. 500 řeš přes Laravel/PHP a DB
4. Rediguj logy před sdílením

~~~bash
systemctl status nginx php8.3-fpm mariadb redis-server pteroq --no-pager
~~~

## Ověření výsledku

Po opravě funguje veřejný login i interní health základních závislostí.

## Související návody

[Kategorie a navazující návody](index.md)
