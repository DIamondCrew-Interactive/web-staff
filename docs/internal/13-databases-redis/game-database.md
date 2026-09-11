---
title: "Game database provisioning"
category: 13-databases-redis
categoryTitle: "Databases & Redis"
order: 190
audience: ["admin","ai"]
tags: ["game-database"]
---

# Game database provisioning

## Purpose

V Panelu musí být připraven Database Host a limit serveru. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

MariaDB databáze panel a oddělené game databáze; Redis není náhradou trvalé DB.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. V Panelu musí být připraven Database Host a limit serveru
2. Server
3. Databases
4. New Database
5. Credentials předej pouze dané aplikaci



## Verification

Hra používá vlastní schema/user, nikoliv panel databázi.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
