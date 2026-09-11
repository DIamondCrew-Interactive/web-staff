---
title: "Web v PHP"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 160
audience: ["admin","ai"]
tags: ["php-site"]
---

# Web v PHP

## K čemu slouží

Ověř PHP verzi aplikace a FPM socket.

## Kde a jak běží

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Postup

1. Ověř PHP verzi aplikace a FPM socket
2. Publikuj jen její public root
3. PHP zdroj musí vykonávat FPM, nikdy se nesmí stáhnout jako text
4. Chraň konfigurační dotfiles

## Ověření výsledku

PHP test vrací výsledek, ne zdroj; dočasný testovací soubor po ověření odeber.

## Související návody

[Kategorie a navazující návody](index.md)
