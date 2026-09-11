---
title: "Minecraft memory limits"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 64
audience: ["user","admin","ai"]
tags: ["minecraft","memory"]
---

# Minecraft memory limits

## Purpose

Paměťový limit zadává panel v MiB. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Paměťový limit zadává panel v MiB
2. 1 GiB je 1024 MiB
3. Heap nepřiděluj celému container limitu; JVM potřebuje i native paměť
4. Sleduj skutečné chování na testovací zátěži



## Verification

Server nepřekračuje container limit ani nepadá na OOM. CPU 100 % v Panelu obvykle znamená kapacitu jednoho jádra, ne celý host.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
