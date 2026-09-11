---
title: "Create schedules"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 51
audience: ["user","admin","ai"]
tags: ["servers","schedules"]
---

# Create schedules

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
2. Schedules
3. Create schedule
4. Zkontroluj timezone a cron/UI interval
5. Přidej command, power nebo backup task s vhodným offsetem



## Verification

Testovací úloha se spustí jednou v očekávaný čas; časy nejsou UTC automaticky.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
