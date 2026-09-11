---
title: "Real status sources"
category: 12-public-status
categoryTitle: "Public Status"
order: 186
audience: ["admin","ai"]
tags: ["sources"]
---

# Real status sources

## Purpose

Pterodactyl vrací stav procesu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Samostatný veřejný proces public-status:3000; žádné admin dlaždice ani Cookbook routy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Pterodactyl vrací stav procesu
2. FiveM vrací počet dostupných hráčů
3. HTTP healthcheck ověřuje reprezentativní endpoint
4. Chybějící zdroj znamená UNKNOWN



## Verification

Neexistují demo counts, historie nebo vymyšlený uptime.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
