---
title: "Založení herní databáze"
category: 13-databases-redis
categoryTitle: "Databáze a Redis"
order: 190
audience: ["admin","ai"]
tags: ["game-database"]
---

# Založení herní databáze

## K čemu slouží

V Panelu musí být připraven Database Host a limit serveru.

## Kde a jak běží

MariaDB databáze panel a oddělené game databáze; Redis není náhradou trvalé DB.

## Postup

1. V Panelu musí být připraven Database Host a limit serveru
2. Server
3. Databases
4. New Database
5. Credentials předej pouze dané aplikaci

## Ověření výsledku

Hra používá vlastní schema/user, nikoliv panel databázi.

## Související návody

[Kategorie a navazující návody](index.md)
