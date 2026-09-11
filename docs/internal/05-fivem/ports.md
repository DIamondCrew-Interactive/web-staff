---
title: "FiveM and txAdmin ports"
category: 05-fivem
categoryTitle: "FiveM"
order: 126
audience: ["admin","ai"]
tags: ["ports"]
---

# FiveM and txAdmin ports

## Purpose

DCRP používá 30120/30121 a 33020/33021. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Oddělené PROD/DEV instance; herní allocations a TXHOST konfigurace.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. DCRP používá 30120/30121 a 33020/33021
2. Prismatic používá 30130/30131 a 33030/33031
3. Ověř game TCP/UDP a admin HTTP zvlášť



## Verification

Hra a konzole fungují nezávisle; NPM HTTP proxy není herní UDP proxy.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
