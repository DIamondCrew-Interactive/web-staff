---
title: "Startup command vs variables"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 54
audience: ["user","admin","ai"]
tags: ["servers","startup-variables"]
---

# Startup command vs variables

## Purpose

Server. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Server
2. Startup ukazuje upravitelné variables
3. Admin startup command je vlastní příkaz s dosazením
4. Environment variables předává container
5. Import nového Eggu nemusí aktualizovat příkaz existujícího serveru

Case study: staré ./FXServer vs nové alpine/opt/cfx-server/FXServer vyvolalo /home/container/FXServer: No such file or directory. Oprav skutečný startup existující instance, ne jen Egg.

## Verification

Příkaz míří na existující executable a variables odpovídají aktuálnímu Eggu.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
