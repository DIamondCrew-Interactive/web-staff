---
title: "Staff and Cookbook backup"
category: 15-backups
categoryTitle: "Backups & restore"
order: 203
audience: ["admin","ai"]
tags: ["staff"]
---

# Staff and Cookbook backup

## Purpose

Kód a secret-free Cookbook jsou verzované. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Kód a secret-free Cookbook jsou verzované
2. Env/session signing key mají oddělený secure backup
3. Sessions jsou paměťové a nezálohují se



## Verification

Po restartu se uživatel přihlásí znovu, veřejný web dál funguje.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
