---
title: "Half-Life decision tree"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 73
audience: ["user","admin","ai"]
tags: ["source-engine","half-life"]
---

# Half-Life decision tree

## Purpose

Rozliš Half-Life 1 / GoldSrc, Half-Life 2 single-player, Half-Life 2: Deathmatch a jiný dedicated server. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Rozliš Half-Life 1 / GoldSrc, Half-Life 2 single-player, Half-Life 2: Deathmatch a jiný dedicated server
2. Název Half-Life sám neurčuje instalaci
3. Pro správný dedicated produkt hledej ověřený Egg
4. Jinak zjisti oficiální distribuci



## Verification

Nezaměnil jsi klientskou hru za dedicated server. Steam App ID se musí ověřit, zde se nevymýšlí.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
