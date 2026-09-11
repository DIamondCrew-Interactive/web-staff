---
title: "Průběh instalace monitoru"
category: 06-txadmin
categoryTitle: "txAdmin"
order: 129
audience: ["admin","ai"]
tags: ["installer"]
---

# Průběh instalace monitoru

## K čemu slouží

Stáhni ověřený FXServer artifact a rozbal ho.

## Kde a jak běží

DiamondCrew monitor nad FXServer artifactem; NPM publikuje konzoli odděleně od hry.

## Postup

1. Stáhni ověřený FXServer artifact a rozbal ho
2. Zálohuj stock monitor
3. Z konkrétního GitHub releasu stáhni monitor.zip
4. Ověř SHA256
5. Nahraď monitor
6. Vytvoř txData a server-data

## Ověření výsledku

Obsah ZIP má očekávaný root a executable startup odpovídá layoutu; nesmaž původní monitor před ověřením.

## Související návody

[Kategorie a navazující návody](index.md)
