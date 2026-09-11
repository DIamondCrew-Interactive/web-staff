---
title: "Pterodactyl volumes backup"
category: 15-backups
categoryTitle: "Backups & restore"
order: 200
audience: ["admin","ai"]
tags: ["pterodactyl-volumes"]
---

# Pterodactyl volumes backup

## Purpose

Data jsou /var/lib/pterodactyl/volumes. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Data jsou /var/lib/pterodactyl/volumes
2. Zastav nebo konzistentně snapshotuj zapisující hry
3. Zachovej UUID mapu serverů a metadata
4. DB mimo volumes zálohuj zvlášť



## Verification

Testovací server načte svět/resources a data odpovídají času zálohy.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
