---
title: "Šifrovací klíč aplikace"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 10
audience: ["admin","ai"]
tags: ["app-key"]
---

# Šifrovací klíč aplikace

## K čemu slouží

Pouze pro prázdnou novou instalaci vygeneruj application key.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Pouze pro prázdnou novou instalaci vygeneruj application key
2. U existujícího Panelu zachovej původní klíč
3. Ulož chráněný env do šifrované offsite zálohy

~~~bash
cd /var/www/pterodactyl
# ONLY a fresh installation with no existing encrypted data:
php artisan key:generate --force
~~~

Skutečný APP_KEY sem nepatří. Placeholder je `<app-key>`. Nový klíč neopravuje ztracené šifrované údaje.

## Ověření výsledku

Obnova testovací kopie s DB a původní konfigurací dokáže číst šifrovaná data.

## Související návody

[Kategorie a navazující návody](index.md)
