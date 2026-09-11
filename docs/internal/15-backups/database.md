---
title: "Záloha databáze"
category: 15-backups
categoryTitle: "Zálohování a obnova"
order: 199
audience: ["admin","ai"]
tags: ["database"]
---

# Záloha databáze

## K čemu slouží

Zajisti konzistenci podle databázového engine.

## Kde a jak běží

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Postup

1. Zajisti konzistenci podle databázového engine
2. Include routines/events/triggers dle potřeby
3. Dump drž mimo veřejný webroot
4. Ověř import na test

## Ověření výsledku

Záloha není nulová a obnovuje očekávané tabulky.

## Související návody

[Kategorie a navazující návody](index.md)
