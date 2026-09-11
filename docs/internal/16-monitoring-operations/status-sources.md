---
title: "Status source semantics"
category: 16-monitoring-operations
categoryTitle: "Monitoring & operations"
order: 207
audience: ["admin","ai"]
tags: ["status-sources"]
---

# Status source semantics

## Purpose

ONLINE je potvrzení nakonfigurovaného zdroje. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Pouze měřené stavy; UNKNOWN není OFFLINE. Provozní změny mají backup a ověření.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. ONLINE je potvrzení nakonfigurovaného zdroje
2. OFFLINE je známý stav procesu nebo neúspěšný HTTP probe
3. DEGRADED je přechodový/problémový stav
4. UNKNOWN je chybějící/nečitelný zdroj



## Verification

Frontend nezaměňuje chybu API oprávnění za vypnutou hru.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
