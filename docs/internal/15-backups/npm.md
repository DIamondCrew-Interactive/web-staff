---
title: "Záloha NPM"
category: 15-backups
categoryTitle: "Zálohování a obnova"
order: 202
audience: ["admin","ai"]
tags: ["npm"]
---

# Záloha NPM

## K čemu slouží

Ulož NPM DB/data a certifikáty konzistentně.

## Kde a jak běží

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Postup

1. Ulož NPM DB/data a certifikáty konzistentně
2. Compose/image verzi eviduj vedle backupu
3. Private keys nepatří do veřejného docs rootu

## Ověření výsledku

Testovací restore načte hosty i TLS konfiguraci.

## Související návody

[Kategorie a navazující návody](index.md)
