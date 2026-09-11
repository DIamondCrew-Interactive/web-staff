---
title: "Pravidla pro porty DiamondCrew"
category: 01-getting-started
categoryTitle: "Začínáme"
order: 116
audience: ["admin","ai"]
tags: ["port-map"]
---

# Pravidla pro porty DiamondCrew

## K čemu slouží

DCRP game PROD/DEV: 30120/30121; txAdmin: 33020/33021.

## Kde a jak běží

Inventář, architektura a pravidla DiamondCrew.

## Postup

1. DCRP game PROD/DEV: 30120/30121; txAdmin: 33020/33021
2. Prismatic game: 30130/30131; txAdmin: 33030/33031
3. Minecraft: 25565 a další ověřené allocations
4. Wings interně HTTP 8443, SFTP 2022
5. Staff/Status interně 3000; Cockpit 9090; NPM 80/443/admin81

~~~bash
ss -ltnp
ss -lunp
~~~

## Ověření výsledku

Toto je DIAMONDCREW CONVENTION, nikoliv obecný požadavek FiveM/Pterodactylu. Před použitím ověř volnost portu.

## Související návody

[Kategorie a navazující návody](index.md)
