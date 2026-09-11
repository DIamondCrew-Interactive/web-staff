---
title: "FiveM artifact update"
category: 05-fivem
categoryTitle: "FiveM"
order: 127
audience: ["admin","ai"]
tags: ["update"]
---

# FiveM artifact update

## Purpose

Zálohuj artifact, monitor, txData, server-data i DB. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Oddělené PROD/DEV instance; herní allocations a TXHOST konfigurace.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Zálohuj artifact, monitor, txData, server-data i DB
2. Na DEV ověř nový artifact a startup
3. Vyměň monitor jen po kontrole checksumu
4. Až poté proveď PROD změnu



## Verification

Install/start/stop/restart a player endpoint jsou ověřené.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
