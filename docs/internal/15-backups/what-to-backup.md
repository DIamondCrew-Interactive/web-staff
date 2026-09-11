---
title: "Backup scope"
category: 15-backups
categoryTitle: "Backups & restore"
order: 197
audience: ["admin","ai"]
tags: ["what-to-backup"]
---

# Backup scope

## Purpose

Data jsou DB, hry a persistent volumes. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Data jsou DB, hry a persistent volumes
2. Configuration jsou provozní soubory a Compose
3. Secrets jsou šifrovací klíče, tokens, credentials a privátní cert keys
4. Každá třída má vlastní chráněný plán



## Verification

Obnovovací manifest uvádí verze, čas a umístění mimo primární host.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
