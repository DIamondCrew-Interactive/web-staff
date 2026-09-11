---
title: "Recovery acceptance"
category: 21-disaster-recovery
categoryTitle: "Disaster recovery"
order: 214
audience: ["admin","ai"]
tags: ["final-checklist"]
---

# Recovery acceptance

## Purpose

Potvrď OS/SSH, Docker, DB/Redis/PHP, Panel/worker/scheduler. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DIA-01 LOST: čistý host, konzistentní offsite zálohy, ověřené verze a řízené přepnutí DNS.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Potvrď OS/SSH, Docker, DB/Redis/PHP, Panel/worker/scheduler
2. Wings a všechny games
3. txAdmin, NPM/TLS, Staff/Status
4. Auth/AI hranice
5. Nová záloha a monitoring



## Verification

Provozní vlastník přijme obnovu a zaznamená skutečný RPO/RTO.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
