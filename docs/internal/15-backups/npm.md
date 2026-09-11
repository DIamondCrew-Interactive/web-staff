---
title: "NPM backup"
category: 15-backups
categoryTitle: "Backups & restore"
order: 202
audience: ["admin","ai"]
tags: ["npm"]
---

# NPM backup

## Purpose

Ulož NPM DB/data a certifikáty konzistentně. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Ulož NPM DB/data a certifikáty konzistentně
2. Compose/image verzi eviduj vedle backupu
3. Private keys nepatří do veřejného docs rootu



## Verification

Testovací restore načte hosty i TLS konfiguraci.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
