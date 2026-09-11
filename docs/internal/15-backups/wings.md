---
title: "Záloha Wings"
category: 15-backups
categoryTitle: "Zálohování a obnova"
order: 201
audience: ["admin","ai"]
tags: ["wings"]
---

# Záloha Wings

## K čemu slouží

Zachovej verzi binárky, konfiguraci a síťový plán.

## Kde a jak běží

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Postup

1. Zachovej verzi binárky, konfiguraci a síťový plán
2. Wings config obsahuje identitu a secrets, patří do secure backupu
3. Nezaměň zálohu nodu s kopií identity pro druhý host

## Ověření výsledku

Při ztrátě nodu existuje plán obnovy stejné identity nebo vytvoření nové.

## Související návody

[Kategorie a navazující návody](index.md)
