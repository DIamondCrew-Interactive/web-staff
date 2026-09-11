---
title: "Závislosti Composeru"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 8
audience: ["admin","ai"]
tags: ["composer"]
---

# Závislosti Composeru

## K čemu slouží

Použij Composer 2 a ověřený installer z getcomposer.org.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Použij Composer 2 a ověřený installer z getcomposer.org
2. V cílové aplikaci použij composer install s lockfile
3. Na produkci neprováděj composer update

~~~bash
cd /var/www/pterodactyl
composer --version
composer install --no-dev --optimize-autoloader
~~~

## Ověření výsledku

Lockfile se samovolně nezměnil; vendor/autoload.php existuje.

## Související návody

[Kategorie a navazující návody](index.md)
