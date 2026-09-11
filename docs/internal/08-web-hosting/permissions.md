---
title: "Web permissions"
category: 08-web-hosting
categoryTitle: "Web hosting"
order: 163
audience: ["admin","ai"]
tags: ["permissions"]
---

# Web permissions

## Purpose

Webserver potřebuje read a traverse, upload adresář případně write. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Webserver potřebuje read a traverse, upload adresář případně write
2. Nepoužívej blanket 777
3. Chráněná konfigurace leží mimo public root



## Verification

Aplikace funguje a nelze HTTP stáhnout provozní env.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
