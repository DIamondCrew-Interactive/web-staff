---
title: "Přehled proměnných TXHOST"
category: 05-fivem
categoryTitle: "FiveM"
order: 124
audience: ["admin","ai"]
tags: ["txhost-variables"]
---

# Přehled proměnných TXHOST

## K čemu slouží

TXHOST_DATA_PATH = persistence; TXHOST_GAME_NAME = hra.

## Kde a jak běží

Oddělené PROD/DEV instance; herní allocations a TXHOST konfigurace.

## Postup

1. TXHOST_DATA_PATH = persistence; TXHOST_GAME_NAME = hra
2. TXHOST_TXA_PORT a TXHOST_FXS_PORT = oddělené allocations
3. TXHOST_INTERFACE = bind
4. TXHOST_MAX_SLOTS = kapacita
5. TXHOST_TXA_URL = veřejná konzole
6. TXHOST_DEFAULT_CFXKEY je secret

## Ověření výsledku

Proměnné odpovídají exportu skutečně používaného Eggu. Výchozí license key nesmí být v JSON/Markdownu.

## Související návody

[Kategorie a navazující návody](index.md)
