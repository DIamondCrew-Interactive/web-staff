---
title: "Reverse proxy models"
category: 08-web-hosting
categoryTitle: "Web hosting"
order: 162
audience: ["admin","ai"]
tags: ["reverse-proxy"]
---

# Reverse proxy models

## Purpose

Rozliš A statické soubory + local nginx, B lokální proces, C Docker. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Rozliš A statické soubory + local nginx, B lokální proces, C Docker
2. NPM vždy potřebuje dosažitelný upstream
3. DNS neukazuje na adresář ani container port



## Verification

Dokážeš nakreslit request flow od browseru po aplikaci.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
