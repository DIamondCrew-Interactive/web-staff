---
title: "Full stack restore"
category: 15-backups
categoryTitle: "Backups & restore"
order: 206
audience: ["admin","ai"]
tags: ["full-restore"]
---

# Full stack restore

## Purpose

Postupuj Disaster recovery DIA-01 LOST. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Postupuj Disaster recovery DIA-01 LOST
2. Nejdřív host/závislosti, pak DB/aplikace, Wings/data, NPM a weby
3. Až po testu DNS



## Verification

Hry, txAdmin a veřejné služby jsou ověřené před ukončením incidentu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
