---
title: "Varianty reverse proxy"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 162
audience: ["admin","ai"]
tags: ["reverse-proxy"]
---

# Varianty reverse proxy

## K čemu slouží

Rozliš A statické soubory + local nginx, B lokální proces, C Docker.

## Kde a jak běží

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Postup

1. Rozliš A statické soubory + local nginx, B lokální proces, C Docker
2. NPM vždy potřebuje dosažitelný upstream
3. DNS neukazuje na adresář ani container port

## Ověření výsledku

Dokážeš nakreslit request flow od browseru po aplikaci.

## Související návody

[Kategorie a navazující návody](index.md)
