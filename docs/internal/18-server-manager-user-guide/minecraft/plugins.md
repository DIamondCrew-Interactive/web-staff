---
title: "Paper plugins"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 67
audience: ["user","admin","ai"]
tags: ["minecraft","plugins"]
---

# Paper plugins

## Purpose

Používej pluginy určené pro danou Paper/Minecraft verzi. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Používej pluginy určené pro danou Paper/Minecraft verzi
2. Zálohuj
3. Nahraj do plugins a proveď úplný restart
4. Nepoužívej neověřené pluginy na PROD



## Verification

Console plugin načte a jeho funkce nepoškodí svět ani oprávnění.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
