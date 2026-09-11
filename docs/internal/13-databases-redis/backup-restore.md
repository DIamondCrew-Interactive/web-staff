---
title: "Export a obnova databáze"
category: 13-databases-redis
categoryTitle: "Databáze a Redis"
order: 191
audience: ["admin","ai"]
tags: ["backup-restore"]
---

# Export a obnova databáze

## K čemu slouží

Konzistenci InnoDB zajistí transakční dump; jiné engine/zápisy posuď zvlášť.

## Kde a jak běží

MariaDB databáze panel a oddělené game databáze; Redis není náhradou trvalé DB.

## Postup

1. Konzistenci InnoDB zajistí transakční dump; jiné engine/zápisy posuď zvlášť
2. Ulož dump do chráněného adresáře
3. Restore testuj na izolované instanci

~~~bash
sudo mariadb-dump --single-transaction --routines --events --triggers panel > /secure-backup/panel.sql
~~~

/secure-backup je schválený chráněný mount, který musíš předem vytvořit. Shell uživatel musí mít právo zápisu; nedávej heslo do CLI argumentů.

## Ověření výsledku

Obnovená aplikace používá kompatibilní schema a původní chráněnou konfiguraci.

## Související návody

[Kategorie a navazující návody](index.md)
