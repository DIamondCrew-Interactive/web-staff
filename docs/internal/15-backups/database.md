---
title: "Database backup"
category: 15-backups
categoryTitle: "Backups & restore"
order: 199
audience: ["admin","ai"]
tags: ["database"]
---

# Database backup

## Purpose

Zajisti konzistenci podle databázového engine. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Zajisti konzistenci podle databázového engine
2. Include routines/events/triggers dle potřeby
3. Dump drž mimo veřejný webroot
4. Ověř import na test



## Verification

Záloha není nulová a obnovuje očekávané tabulky.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
