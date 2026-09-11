---
title: "Required offsite recovery material"
category: 21-disaster-recovery
categoryTitle: "Disaster recovery"
order: 213
audience: ["admin","ai"]
tags: ["required-backups"]
---

# Required offsite recovery material

## Purpose

Připrav DB dumps, volumes, verze aplikací a chráněné konfigurace. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DIA-01 LOST: čistý host, konzistentní offsite zálohy, ověřené verze a řízené přepnutí DNS.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Připrav DB dumps, volumes, verze aplikací a chráněné konfigurace
2. Odděleně uchovej APP_KEY, DB credentials, Wings identitu, Discord secrets, license keys a cert keys
3. Klíč k backupu musí být dostupný i bez DIA-01



## Verification

Žádná nezbytná část obnovy není pouze na ztraceném serveru.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
