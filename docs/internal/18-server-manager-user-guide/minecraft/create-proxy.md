---
title: "Create a Minecraft proxy"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 61
audience: ["user","admin","ai"]
tags: ["minecraft","create-proxy"]
---

# Create a Minecraft proxy

## Purpose

Rozliš herní backend a proxy jako Velocity. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Rozliš herní backend a proxy jako Velocity
2. Použij ověřený proxy Egg a vlastní allocation
3. Backend servery chraň před obcházením proxy a nastav kompatibilní forwarding



## Verification

Klient jde přes proxy a přímý neoprávněný přístup k backendu je zablokovaný.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
