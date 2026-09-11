---
title: "Monitor installer pipeline"
category: 06-txadmin
categoryTitle: "txAdmin"
order: 129
audience: ["admin","ai"]
tags: ["installer"]
---

# Monitor installer pipeline

## Purpose

Stáhni ověřený FXServer artifact a rozbal ho. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew monitor nad FXServer artifactem; NPM publikuje konzoli odděleně od hry.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Stáhni ověřený FXServer artifact a rozbal ho
2. Zálohuj stock monitor
3. Z konkrétního GitHub releasu stáhni monitor.zip
4. Ověř SHA256
5. Nahraď monitor
6. Vytvoř txData a server-data



## Verification

Obsah ZIP má očekávaný root a executable startup odpovídá layoutu; nesmaž původní monitor před ověřením.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
