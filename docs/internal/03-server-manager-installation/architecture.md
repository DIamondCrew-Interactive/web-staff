---
title: "Architektura panelu"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 1
audience: ["admin","ai"]
tags: ["architecture"]
---

# Architektura panelu

## K čemu slouží

Odděl webový Panel od Wings.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Odděl webový Panel od Wings
2. NPM ukončuje HTTPS a předává request lokálnímu nginx
3. nginx posílá PHP do php8.3-fpm, Laravel používá MariaDB panel a Redis
4. pteroq zpracovává queue a cron spouští scheduler

~~~bash
systemctl is-active nginx php8.3-fpm mariadb redis-server pteroq
~~~

## Ověření výsledku

Ověř veřejný login, stav pteroq a dosažitelnost nodu.

## Související návody

[Kategorie a navazující návody](index.md)
