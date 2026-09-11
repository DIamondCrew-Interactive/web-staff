---
title: "Public status boundary"
category: 12-public-status
categoryTitle: "Public Status"
order: 185
audience: ["admin","ai"]
tags: ["architecture"]
---

# Public status boundary

## Purpose

Public-status:3000 používá oddělený frontend a bez docs/OAuth rout. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Samostatný veřejný proces public-status:3000; žádné admin dlaždice ani Cookbook routy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Public-status:3000 používá oddělený frontend a bez docs/OAuth rout
2. Zobrazuje produkční roleplay, Minecraft a obecnou infrastrukturu
3. DEV admin odkazy nejsou součástí status webu



## Verification

/api/internal/docs a /api/cookbook/index na status hostu vrací 404.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
