---
title: "Aktualizace panelu"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 24
audience: ["admin","ai"]
tags: ["update"]
---

# Aktualizace panelu

## K čemu slouží

Zkontroluj release notes a kompatibilitu Wings.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Zkontroluj release notes a kompatibilitu Wings
2. Zálohuj DB, konfiguraci a aplikaci
3. Přepni údržbu a aplikuj konkrétní ověřený release
4. Nainstaluj dependencies, migrations a obnov queue

~~~bash
cd /var/www/pterodactyl
php artisan down
# Apply the verified release and dependencies before migrations.
php artisan migrate --seed --force
php artisan queue:restart
php artisan up
~~~

## Ověření výsledku

Login, DB, worker, scheduler i testovací game server fungují.

## Související návody

[Kategorie a navazující návody](index.md)
