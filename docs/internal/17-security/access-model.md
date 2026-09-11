---
title: "UI authorization vs AI access"
category: 17-security
categoryTitle: "Security"
order: 211
audience: ["admin","ai"]
tags: ["access-model"]
---

# UI authorization vs AI access

## Purpose

Discord allowlist chrání Cookbook UI a staff docs API. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Nejnižší nutná oprávnění, ochrana secrets a veřejně bezpečný read-only Cookbook.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Discord allowlist chrání Cookbook UI a staff docs API
2. AI API je unlisted public read-only
3. Robots/noindex nejsou security boundary
4. Schválený root musí být bezpečný i při nalezení URL



## Verification

Anonymous AI čte jen Cookbook, nemá zápis ani libovolný filesystem.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
