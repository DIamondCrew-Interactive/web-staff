---
title: "Linux artifact layout"
category: 05-fivem
categoryTitle: "FiveM"
order: 125
audience: ["admin","ai"]
tags: ["artifact-layout"]
---

# Linux artifact layout

## Purpose

FXServer executable je alpine/opt/cfx-server/FXServer. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Oddělené PROD/DEV instance; herní allocations a TXHOST konfigurace.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. FXServer executable je alpine/opt/cfx-server/FXServer
2. Monitor je alpine/opt/cfx-server/citizen/system_resources/monitor
3. Existující server může mít starý startup ./FXServer

~~~bash
test -f alpine/opt/cfx-server/FXServer
ls alpine/opt/cfx-server/citizen/system_resources/monitor
~~~



## Verification

Start nehlásí /home/container/FXServer: No such file or directory.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
