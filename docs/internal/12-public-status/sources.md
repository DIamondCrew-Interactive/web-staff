---
title: "Zdroje skutečných stavů"
category: 12-public-status
categoryTitle: "Veřejný status"
order: 186
audience: ["admin","ai"]
tags: ["sources"]
---

# Zdroje skutečných stavů

## K čemu slouží

Pterodactyl vrací stav procesu.

## Kde a jak běží

Samostatný veřejný proces public-status:3000; žádné admin dlaždice ani Cookbook routy.

## Postup

1. Pterodactyl vrací stav procesu
2. FiveM vrací počet dostupných hráčů
3. HTTP healthcheck ověřuje reprezentativní endpoint
4. Chybějící zdroj znamená UNKNOWN

## Ověření výsledku

Neexistují demo counts, historie nebo vymyšlený uptime.

## Související návody

[Kategorie a navazující návody](index.md)
