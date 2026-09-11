---
title: "Composer dependencies"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 8
audience: ["admin","ai"]
tags: ["composer"]
---

# Composer dependencies

## Purpose

Použij Composer 2 a ověřený installer z getcomposer.org. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Použij Composer 2 a ověřený installer z getcomposer.org
2. V cílové aplikaci použij composer install s lockfile
3. Na produkci neprováděj composer update

~~~bash
cd /var/www/pterodactyl
composer --version
composer install --no-dev --optimize-autoloader
~~~



## Verification

Lockfile se samovolně nezměnil; vendor/autoload.php existuje.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
