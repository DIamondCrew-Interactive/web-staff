---
title: "Incident and maintenance"
category: 12-public-status
categoryTitle: "Public Status"
order: 187
audience: ["admin","ai"]
tags: ["incidents"]
---

# Incident and maintenance

## Purpose

Veřejné env oznámení má popsat dopad bez secrets. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Samostatný veřejný proces public-status:3000; žádné admin dlaždice ani Cookbook routy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Veřejné env oznámení má popsat dopad bez secrets
2. Globální nebo target maintenance označí údržbu
3. Po ukončení vrať flag a ověř skutečné probes



## Verification

Banner odpovídá reálnému incidentu; nezveřejňuje interní IP.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
