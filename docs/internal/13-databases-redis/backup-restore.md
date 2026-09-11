---
title: "Database dump and restore"
category: 13-databases-redis
categoryTitle: "Databases & Redis"
order: 191
audience: ["admin","ai"]
tags: ["backup-restore"]
---

# Database dump and restore

## Purpose

Konzistenci InnoDB zajistí transakční dump; jiné engine/zápisy posuď zvlášť. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

MariaDB databáze panel a oddělené game databáze; Redis není náhradou trvalé DB.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Konzistenci InnoDB zajistí transakční dump; jiné engine/zápisy posuď zvlášť
2. Ulož dump do chráněného adresáře
3. Restore testuj na izolované instanci

~~~bash
sudo mariadb-dump --single-transaction --routines --events --triggers panel > /secure-backup/panel.sql
~~~

/secure-backup je schválený chráněný mount, který musíš předem vytvořit. Shell uživatel musí mít právo zápisu; nedávej heslo do CLI argumentů.

## Verification

Obnovená aplikace používá kompatibilní schema a původní chráněnou konfiguraci.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
