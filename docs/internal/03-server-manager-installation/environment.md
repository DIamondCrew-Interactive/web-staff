---
title: "Proměnné prostředí panelu"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 9
audience: ["admin","ai"]
tags: ["environment"]
---

# Proměnné prostředí panelu

## K čemu slouží

Pouze u nové instalace vytvoř .env z .env.example.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Pouze u nové instalace vytvoř .env z .env.example
2. p:environment:setup nastaví URL a cache/session
3. p:environment:database nastaví lokální DB
4. p:environment:mail nastaví schválený SMTP transport

~~~bash
cd /var/www/pterodactyl
php artisan p:environment:setup
php artisan p:environment:database
php artisan p:environment:mail
~~~

## Ověření výsledku

URL panelu je HTTPS a přihlášení i mail fungují; .env není webově dostupný.

## Související návody

[Kategorie a navazující návody](index.md)
