---
title: "Vlastní monitor txAdminu"
category: 06-txadmin
categoryTitle: "txAdmin"
order: 128
audience: ["admin","ai"]
tags: ["architecture"]
---

# Vlastní monitor txAdminu

## K čemu slouží

DiamondCrew source je fivem-txadmindc.

## Kde a jak běží

DiamondCrew monitor nad FXServer artifactem; NPM publikuje konzoli odděleně od hry.

## Postup

1. DiamondCrew source je fivem-txadmindc
2. Custom monitor nahrazuje pouze monitor resources v Linux artifactu
3. Herní data a txData jsou samostatná persistence

## Ověření výsledku

Brandovaný login i původní admin funkce fungují.

## Související návody

[Kategorie a navazující návody](index.md)
