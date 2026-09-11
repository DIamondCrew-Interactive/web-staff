---
title: "Přístup ke Cookbooku"
category: 11-staff-center
categoryTitle: "Staff Center"
order: 182
audience: ["admin","ai"]
tags: ["cookbook-access"]
---

# Přístup ke Cookbooku

## K čemu slouží

Protected staff docs používají allowlist každým requestem.

## Kde a jak běží

Veřejný rozcestník; Discord povoluje Cookbook UI. Express na 3000 za NPM.

## Postup

1. Protected staff docs používají allowlist každým requestem
2. AI routes jsou veřejné při znalosti URL a bez zápisu
3. Robots není bezpečnostní hranice
4. Do schváleného rootu nepatří žádné skutečné secrets

## Ověření výsledku

Přímý .env/arbitrary path nevrátí obsah; AI bundle obsahuje jen Markdown z Cookbooku.

## Související návody

[Kategorie a navazující návody](index.md)
