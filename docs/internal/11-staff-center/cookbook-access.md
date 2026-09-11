---
title: "Cookbook access boundaries"
category: 11-staff-center
categoryTitle: "Staff Center"
order: 182
audience: ["admin","ai"]
tags: ["cookbook-access"]
---

# Cookbook access boundaries

## Purpose

Protected staff docs používají allowlist každým requestem. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejný rozcestník; Discord povoluje Cookbook UI. Express na 3000 za NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Protected staff docs používají allowlist každým requestem
2. AI routes jsou veřejné při znalosti URL a bez zápisu
3. Robots není bezpečnostní hranice
4. Do schváleného rootu nepatří žádné skutečné secrets



## Verification

Přímý .env/arbitrary path nevrátí obsah; AI bundle obsahuje jen Markdown z Cookbooku.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
