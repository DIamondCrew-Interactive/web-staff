---
title: "Local application model"
category: 08-web-hosting
categoryTitle: "Web hosting"
order: 161
audience: ["admin","ai"]
tags: ["local-app"]
---

# Local application model

## Purpose

Aplikace běží jako omezený systemd uživatel na ověřeném interním portu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Aplikace běží jako omezený systemd uživatel na ověřeném interním portu
2. NPM používá host reachable address
3. Nastav restart policy a healthcheck



## Verification

systemd status a přímý HTTP health odpovídají, pak i veřejná doména.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
