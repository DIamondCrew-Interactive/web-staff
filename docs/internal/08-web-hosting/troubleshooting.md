---
title: "Web hosting troubleshooting"
category: 08-web-hosting
categoryTitle: "Web hosting"
order: 166
audience: ["admin","ai"]
tags: ["troubleshooting"]
---

# Web hosting troubleshooting

## Purpose

404 řeš root/server_name/try_files. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. 404 řeš root/server_name/try_files
2. 502 řeš FPM nebo upstream
3. 403 řeš permissions a index
4. Port conflict řeš listenery



## Verification

nginx -t projde a správný Host vrací očekávanou stránku.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
