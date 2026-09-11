---
title: "Panel environment"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 9
audience: ["admin","ai"]
tags: ["environment"]
---

# Panel environment

## Purpose

Pouze u nové instalace vytvoř .env z .env.example. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

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



## Verification

URL panelu je HTTPS a přihlášení i mail fungují; .env není webově dostupný.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
