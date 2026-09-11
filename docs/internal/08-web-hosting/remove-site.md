---
title: "Remove a web safely"
category: 08-web-hosting
categoryTitle: "Web hosting"
order: 165
audience: ["admin","ai"]
tags: ["remove-site"]
---

# Remove a web safely

## Purpose

Ověř vlastníka a závislosti. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Ověř vlastníka a závislosti
2. Zálohuj konfiguraci/data
3. Vypni Proxy Host a DNS dle plánu
4. Teprve po retenční lhůtě odstraň potvrzený web root



## Verification

Ostatní vhosty a certifikáty fungují, starý web lze z backupu obnovit.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
