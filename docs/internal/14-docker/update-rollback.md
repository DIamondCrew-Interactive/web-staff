---
title: "Image update and rollback"
category: 14-docker
categoryTitle: "Docker & networking"
order: 196
audience: ["admin","ai"]
tags: ["update-rollback"]
---

# Image update and rollback

## Purpose

Před build označ běžící image rollback tagem. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Docker host, bridge sítě, pterodactyl0 a external diamondcrew-proxy mají různé úlohy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Před build označ běžící image rollback tagem
2. Nový build otestuj
3. Při regresi vrať image spolu s kompatibilní Compose/env konfigurací



## Verification

Starý image není přepsaný ani automaticky odstraněný před akceptací.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
