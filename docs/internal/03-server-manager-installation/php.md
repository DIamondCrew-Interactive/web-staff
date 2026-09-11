---
title: "PHP 8.3"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 3
audience: ["admin","ai"]
tags: ["php"]
---

# PHP 8.3

## Purpose

Debian 12 standardně neposkytuje cílové PHP 8.3. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

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



## Verification

CLI i FPM používají požadovanou verzi; nginx test projde.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
