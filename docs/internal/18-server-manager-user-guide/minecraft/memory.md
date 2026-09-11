---
title: "Paměťové limity Minecraftu"
category: 18-server-manager-user-guide
categoryTitle: "Používání Server Manageru"
order: 64
audience: ["user","admin","ai"]
tags: ["minecraft","memory"]
---

# Paměťové limity Minecraftu

## K čemu slouží

Paměťový limit zadává panel v MiB.

## Kde a co nastavit

1. Paměťový limit zadává panel v MiB
2. 1 GiB je 1024 MiB
3. Heap nepřiděluj celému container limitu; JVM potřebuje i native paměť
4. Sleduj skutečné chování na testovací zátěži

## Ověření výsledku

Server nepřekračuje container limit ani nepadá na OOM. CPU 100 % v Panelu obvykle znamená kapacitu jednoho jádra, ne celý host.

## Související návody

[Kategorie a navazující návody](../index.md)
