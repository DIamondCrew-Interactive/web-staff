---
title: "Bezpečné odstranění webu"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 165
audience: ["admin","ai"]
tags: ["remove-site"]
---

# Bezpečné odstranění webu

## K čemu slouží

Ověř vlastníka a závislosti.

## Kde a jak běží

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Postup

1. Ověř vlastníka a závislosti
2. Zálohuj konfiguraci/data
3. Vypni Proxy Host a DNS dle plánu
4. Teprve po retenční lhůtě odstraň potvrzený web root

## Ověření výsledku

Ostatní vhosty a certifikáty fungují, starý web lze z backupu obnovit.

## Související návody

[Kategorie a navazující návody](index.md)
