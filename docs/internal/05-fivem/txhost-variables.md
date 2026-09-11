---
title: "TXHOST variable map"
category: 05-fivem
categoryTitle: "FiveM"
order: 124
audience: ["admin","ai"]
tags: ["txhost-variables"]
---

# TXHOST variable map

## Purpose

TXHOST_DATA_PATH = persistence; TXHOST_GAME_NAME = hra. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Oddělené PROD/DEV instance; herní allocations a TXHOST konfigurace.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. TXHOST_DATA_PATH = persistence; TXHOST_GAME_NAME = hra
2. TXHOST_TXA_PORT a TXHOST_FXS_PORT = oddělené allocations
3. TXHOST_INTERFACE = bind
4. TXHOST_MAX_SLOTS = kapacita
5. TXHOST_TXA_URL = veřejná konzole
6. TXHOST_DEFAULT_CFXKEY je secret



## Verification

Proměnné odpovídají exportu skutečně používaného Eggu. Výchozí license key nesmí být v JSON/Markdownu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
