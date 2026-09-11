---
title: "FiveM installation"
category: 05-fivem
categoryTitle: "FiveM"
order: 123
audience: ["admin","ai"]
tags: ["install"]
---

# FiveM installation

## Purpose

Použij existující DiamondCrew FiveM txAdmin Egg. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Oddělené PROD/DEV instance; herní allocations a TXHOST konfigurace.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Použij existující DiamondCrew FiveM txAdmin Egg
2. Zvol ověřený Linux artifact
3. Installer vytvoří alpine/opt/cfx-server, txData a server-data
4. License konfiguruj bezpečně v chráněném startup nastavení



## Verification

Proces startuje ze správné cesty a hráč se připojí na správný port.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
