---
title: "Aktualizace Staff Centeru"
category: 11-staff-center
categoryTitle: "Staff Center"
order: 183
audience: ["admin","ai"]
tags: ["update"]
---

# Aktualizace Staff Centeru

## K čemu slouží

Uchovej předchozí commit, env a image.

## Kde a jak běží

Veřejný rozcestník; Discord povoluje Cookbook UI. Express na 3000 za NPM.

## Postup

1. Uchovej předchozí commit, env a image
2. Až po schváleném pushi fetchni a checkoutni konkrétní commit
3. Doplň env
4. Build a recreate
5. Ověř public/auth/AI hranice

~~~bash
cd /opt/diamondcrew-staffcenter
git fetch origin --tags
# git checkout <approved-commit>
docker compose build
docker compose up -d
docker compose ps
~~~

## Ověření výsledku

Status a login fungují; nic v deploymentu nespouští vzdálené příkazy z dokumentace.

## Související návody

[Kategorie a navazující návody](index.md)
