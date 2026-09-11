---
title: "Spouštěcí příkaz a proměnné"
category: 18-server-manager-user-guide
categoryTitle: "Používání Server Manageru"
order: 54
audience: ["user","admin","ai"]
tags: ["servers","startup-variables"]
---

# Spouštěcí příkaz a proměnné

## K čemu slouží

Server.

## Kde a co nastavit

1. Server
2. Startup ukazuje upravitelné variables
3. Admin startup command je vlastní příkaz s dosazením
4. Environment variables předává container
5. Import nového Eggu nemusí aktualizovat příkaz existujícího serveru

Case study: staré ./FXServer vs nové alpine/opt/cfx-server/FXServer vyvolalo /home/container/FXServer: No such file or directory. Oprav skutečný startup existující instance, ne jen Egg.

## Ověření výsledku

Příkaz míří na existující executable a variables odpovídají aktuálnímu Eggu.

## Související návody

[Kategorie a navazující návody](../index.md)
