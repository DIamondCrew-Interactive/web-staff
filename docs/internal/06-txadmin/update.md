---
title: "Update DiamondCrew txAdmin"
category: 06-txadmin
categoryTitle: "txAdmin"
order: 132
audience: ["admin","ai"]
tags: ["update"]
---

# Update DiamondCrew txAdmin

## Purpose

Nejdřív uchovej současný monitor i artifact. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew monitor nad FXServer artifactem; NPM publikuje konzoli odděleně od hry.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Nejdřív uchovej současný monitor i artifact
2. Změnu otestuj na DEV a ověř hash ZIP
3. Zastav proces, vyměň monitor a restartuj
4. Na existující instanci ověř startup



## Verification

Přihlašování a běžné admin operace odpovídají předchozí verzi.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
