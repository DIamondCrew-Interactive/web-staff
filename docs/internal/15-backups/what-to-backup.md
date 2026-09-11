---
title: "Co zálohovat"
category: 15-backups
categoryTitle: "Zálohování a obnova"
order: 197
audience: ["admin","ai"]
tags: ["what-to-backup"]
---

# Co zálohovat

## K čemu slouží

Data jsou DB, hry a persistent volumes.

## Kde a jak běží

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Postup

1. Data jsou DB, hry a persistent volumes
2. Configuration jsou provozní soubory a Compose
3. Secrets jsou šifrovací klíče, tokens, credentials a privátní cert keys
4. Každá třída má vlastní chráněný plán

## Ověření výsledku

Obnovovací manifest uvádí verze, čas a umístění mimo primární host.

## Související návody

[Kategorie a navazující návody](index.md)
