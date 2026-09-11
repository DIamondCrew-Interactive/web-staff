---
title: "Oprávnění webu"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 163
audience: ["admin","ai"]
tags: ["permissions"]
---

# Oprávnění webu

## K čemu slouží

Webserver potřebuje read a traverse, upload adresář případně write.

## Kde a jak běží

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Postup

1. Webserver potřebuje read a traverse, upload adresář případně write
2. Nepoužívej blanket 777
3. Chráněná konfigurace leží mimo public root

## Ověření výsledku

Aplikace funguje a nelze HTTP stáhnout provozní env.

## Související návody

[Kategorie a navazující návody](index.md)
