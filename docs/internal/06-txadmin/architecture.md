---
title: "txAdmin custom monitor"
category: 06-txadmin
categoryTitle: "txAdmin"
order: 128
audience: ["admin","ai"]
tags: ["architecture"]
---

# txAdmin custom monitor

## Purpose

DiamondCrew source je fivem-txadmindc. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew monitor nad FXServer artifactem; NPM publikuje konzoli odděleně od hry.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. DiamondCrew source je fivem-txadmindc
2. Custom monitor nahrazuje pouze monitor resources v Linux artifactu
3. Herní data a txData jsou samostatná persistence



## Verification

Brandovaný login i původní admin funkce fungují.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
