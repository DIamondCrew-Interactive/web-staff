---
title: "Maintenance procedure"
category: 16-monitoring-operations
categoryTitle: "Monitoring & operations"
order: 208
audience: ["admin","ai"]
tags: ["maintenance"]
---

# Maintenance procedure

## Purpose

Oznam veřejný dopad. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Pouze měřené stavy; UNKNOWN není OFFLINE. Provozní změny mají backup a ověření.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Oznam veřejný dopad
2. Zálohuj
3. Proveď schválenou změnu
4. Ověř
5. Ukonči údržbu až po skutečném testu



## Verification

Status banner odpovídá realitě a incident má vlastníka.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
