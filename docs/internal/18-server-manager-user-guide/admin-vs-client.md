---
title: "Admin vs client"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 45
audience: ["user","admin","ai"]
tags: ["admin-vs-client"]
---

# Admin vs client

## Purpose

Client část spravuje přidělený server. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Client část spravuje přidělený server
2. Admin část zakládá servery, nody a Eggs
3. Pokud Admin nevidíš, požádej správce místo sdílení jeho účtu



## Verification

Běžný uživatel má jen práva pro svůj úkol.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](index.md)
