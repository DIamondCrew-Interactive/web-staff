---
title: "FiveM TXHOST variables"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 83
audience: ["user","admin","ai"]
tags: ["fivem","variables"]
---

# FiveM TXHOST variables

## Purpose

Nastav game port a txAdmin port podle skutečných allocations. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Nastav game port a txAdmin port podle skutečných allocations
2. TXHOST_DATA_PATH ukazuje trvalá data
3. TXHOST_INTERFACE musí odpovídat container bindingu
4. Secret proměnnou vyplň pouze v chráněném UI



## Verification

txAdmin používá správný veřejný URL a hra správný game port.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
