---
title: "Rollback Staff Center"
category: 11-staff-center
categoryTitle: "Staff Center"
order: 184
audience: ["admin","ai"]
tags: ["rollback"]
---

# Rollback Staff Center

## Purpose

Vrať předchozí zdroj/Compose a chráněný env. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejný rozcestník; Discord povoluje Cookbook UI. Express na 3000 za NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Vrať předchozí zdroj/Compose a chráněný env
2. Spusť uchovanou kompatibilní image bez build
3. Pokud se vrací starý Basic Auth koncept, obnov jeho konfiguraci i přístupový model



## Verification

Veřejné a soukromé hranice odpovídají vrácené verzi; session restartem zanikne.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
