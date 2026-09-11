---
title: "Source and GoldSrc choices"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 72
audience: ["user","admin","ai"]
tags: ["source-engine","index"]
---

# Source and GoldSrc choices

## Purpose

Nejdřív identifikuj konkrétní titul a dedikovaný server. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Nejdřív identifikuj konkrétní titul a dedikovaný server
2. GoldSrc není Source
3. Existuje-li správný ověřený Egg, použij ho
4. Jinak postupuj New Game workflow



## Verification

Zvolený engine, runtime i distribuční metoda odpovídají hře.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
