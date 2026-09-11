---
title: "Rozsah veřejného statusu"
category: 12-public-status
categoryTitle: "Veřejný status"
order: 185
audience: ["admin","ai"]
tags: ["architecture"]
---

# Rozsah veřejného statusu

## K čemu slouží

Public-status:3000 používá oddělený frontend a bez docs/OAuth rout.

## Kde a jak běží

Samostatný veřejný proces public-status:3000; žádné admin dlaždice ani Cookbook routy.

## Postup

1. Public-status:3000 používá oddělený frontend a bez docs/OAuth rout
2. Zobrazuje produkční roleplay, Minecraft a obecnou infrastrukturu
3. DEV admin odkazy nejsou součástí status webu

## Ověření výsledku

/api/internal/docs a /api/cookbook/index na status hostu vrací 404.

## Související návody

[Kategorie a navazující návody](index.md)
