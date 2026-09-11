---
title: "DiamondCrew port convention"
category: 01-getting-started
categoryTitle: "Getting started"
order: 116
audience: ["admin","ai"]
tags: ["port-map"]
---

# DiamondCrew port convention

## Purpose

DCRP game PROD/DEV: 30120/30121; txAdmin: 33020/33021. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Inventář, architektura a pravidla DiamondCrew.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. DCRP game PROD/DEV: 30120/30121; txAdmin: 33020/33021
2. Prismatic game: 30130/30131; txAdmin: 33030/33031
3. Minecraft: 25565 a další ověřené allocations
4. Wings interně HTTP 8443, SFTP 2022
5. Staff/Status interně 3000; Cockpit 9090; NPM 80/443/admin81

~~~bash
ss -ltnp
ss -lunp
~~~



## Verification

Toto je DIAMONDCREW CONVENTION, nikoliv obecný požadavek FiveM/Pterodactylu. Před použitím ověř volnost portu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
