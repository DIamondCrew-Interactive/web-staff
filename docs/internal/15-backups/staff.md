---
title: "Záloha Staff Centeru a Cookbooku"
category: 15-backups
categoryTitle: "Zálohování a obnova"
order: 203
audience: ["admin","ai"]
tags: ["staff"]
---

# Záloha Staff Centeru a Cookbooku

## K čemu slouží

Kód a secret-free Cookbook jsou verzované.

## Kde a jak běží

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Postup

1. Kód a secret-free Cookbook jsou verzované
2. Env/session signing key mají oddělený secure backup
3. Sessions jsou paměťové a nezálohují se

## Ověření výsledku

Po restartu se uživatel přihlásí znovu, veřejný web dál funguje.

## Související návody

[Kategorie a navazující návody](index.md)
