---
title: "Porty FiveM a txAdminu"
category: 05-fivem
categoryTitle: "FiveM"
order: 126
audience: ["admin","ai"]
tags: ["ports"]
---

# Porty FiveM a txAdminu

## K čemu slouží

DCRP používá 30120/30121 a 33020/33021.

## Kde a jak běží

Oddělené PROD/DEV instance; herní allocations a TXHOST konfigurace.

## Postup

1. DCRP používá 30120/30121 a 33020/33021
2. Prismatic používá 30130/30131 a 33030/33031
3. Ověř game TCP/UDP a admin HTTP zvlášť

## Ověření výsledku

Hra a konzole fungují nezávisle; NPM HTTP proxy není herní UDP proxy.

## Související návody

[Kategorie a navazující návody](index.md)
