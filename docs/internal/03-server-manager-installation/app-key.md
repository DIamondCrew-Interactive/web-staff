---
title: "Application encryption key"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 10
audience: ["admin","ai"]
tags: ["app-key"]
---

# Application encryption key

## Purpose

Pouze pro prázdnou novou instalaci vygeneruj application key. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Pouze pro prázdnou novou instalaci vygeneruj application key
2. U existujícího Panelu zachovej původní klíč
3. Ulož chráněný env do šifrované offsite zálohy

~~~bash
cd /var/www/pterodactyl
# ONLY a fresh installation with no existing encrypted data:
php artisan key:generate --force
~~~

Skutečný APP_KEY sem nepatří. Placeholder je `<app-key>`. Nový klíč neopravuje ztracené šifrované údaje.

## Verification

Obnova testovací kopie s DB a původní konfigurací dokáže číst šifrovaná data.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
