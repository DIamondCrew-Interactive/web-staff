---
title: "MariaDB operations"
category: 13-databases-redis
categoryTitle: "Databases & Redis"
order: 188
audience: ["admin","ai"]
tags: ["mariadb"]
---

# MariaDB operations

## Purpose

Rozliš panel DB a databáze her. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

MariaDB databáze panel a oddělené game databáze; Redis není náhradou trvalé DB.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Rozliš panel DB a databáze her
2. Omez user hosty a grants
3. Před změnou schema zálohuj
4. Nesdílej root DB účet s hrou

~~~bash
sudo mariadb-admin ping
systemctl status mariadb --no-pager
~~~



## Verification

mariadb-admin ping a aplikační spojení fungují.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
