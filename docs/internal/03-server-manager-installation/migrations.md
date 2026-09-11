---
title: "Databázové migrace"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 11
audience: ["admin","ai"]
tags: ["migrations"]
---

# Databázové migrace

## K čemu slouží

Před migrací existující DB udělej konzistentní dump.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Před migrací existující DB udělej konzistentní dump
2. Na nové instalaci inicializuj tabulky a seed
3. Proces nepřerušuj bez diagnostiky
4. Zaznamenej úspěšné migrations

~~~bash
cd /var/www/pterodactyl
php artisan migrate --seed --force
php artisan migrate:status
~~~

## Ověření výsledku

migrate:status neukazuje neočekávaně pending položky.

## Související návody

[Kategorie a navazující návody](index.md)
