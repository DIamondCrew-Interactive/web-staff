---
title: "Statický web"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 157
audience: ["admin","ai"]
tags: ["static-site"]
---

# Statický web

## K čemu slouží

Statické soubory publikuje lokální nginx z public web root.

## Kde a jak běží

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Postup

1. Statické soubory publikuje lokální nginx z public web root
2. NPM řeší vnější doménu/TLS
3. Do rootu nepatří .env, Git ani privátní dokumenty

## Ověření výsledku

Existující soubor vrací 200 a neexistující 404.

## Související návody

[Kategorie a navazující návody](index.md)
