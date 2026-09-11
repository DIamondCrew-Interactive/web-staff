---
title: "Post-change verification"
category: 16-monitoring-operations
categoryTitle: "Monitoring & operations"
order: 209
audience: ["admin","ai"]
tags: ["verification"]
---

# Post-change verification

## Purpose

Testuj veřejný request i skutečný proces. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Pouze měřené stavy; UNKNOWN není OFFLINE. Provozní změny mají backup a ověření.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Testuj veřejný request i skutečný proces
2. U her připojení hráče a persistence
3. U webu login/assets/API
4. U infrastruktury health a zálohy



## Verification

Každá změna má doložený výsledek v provozním záznamu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
