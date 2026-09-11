---
title: "Wings backup"
category: 15-backups
categoryTitle: "Backups & restore"
order: 201
audience: ["admin","ai"]
tags: ["wings"]
---

# Wings backup

## Purpose

Zachovej verzi binárky, konfiguraci a síťový plán. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Zachovej verzi binárky, konfiguraci a síťový plán
2. Wings config obsahuje identitu a secrets, patří do secure backupu
3. Nezaměň zálohu nodu s kopií identity pro druhý host



## Verification

Při ztrátě nodu existuje plán obnovy stejné identity nebo vytvoření nové.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
