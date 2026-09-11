---
title: "Panel update"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 24
audience: ["admin","ai"]
tags: ["update"]
---

# Panel update

## Purpose

Zkontroluj release notes a kompatibilitu Wings. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

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



## Verification

Login, DB, worker, scheduler i testovací game server fungují.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
