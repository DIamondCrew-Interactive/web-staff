---
title: "PHP 8.3"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 3
audience: ["admin","ai"]
tags: ["php"]
---

# PHP 8.3

## K čemu slouží

Debian 12 standardně neposkytuje cílové PHP 8.3.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Debian 12 standardně neposkytuje cílové PHP 8.3
2. Použij ověřený Sury postup ve Fresh install
3. Nainstaluj CLI, FPM a potřebná rozšíření
4. Nastav nginx socket pro PHP 8.3, ne jinou lokální verzi

~~~bash
php -v
php -m
systemctl status php8.3-fpm --no-pager
ls /run/php
~~~

## Ověření výsledku

CLI i FPM používají požadovanou verzi; nginx test projde.

## Související návody

[Kategorie a navazující návody](index.md)
