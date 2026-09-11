---
title: "Uchovávání záloh mimo server"
category: 15-backups
categoryTitle: "Zálohování a obnova"
order: 204
audience: ["admin","ai"]
tags: ["offsite"]
---

# Uchovávání záloh mimo server

## K čemu slouží

Záloha musí být mimo DIA-01.

## Kde a jak běží

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Postup

1. Záloha musí být mimo DIA-01
2. Šifruj ji a odděl oprávnění od produkce
3. Retenci stanov podle schváleného RPO/RTO
4. Ověř, že klíč k záloze není jen na ztraceném hostu

## Ověření výsledku

Simulovaný restore lze provést bez přístupu k původnímu DIA-01.

## Související návody

[Kategorie a navazující návody](index.md)
