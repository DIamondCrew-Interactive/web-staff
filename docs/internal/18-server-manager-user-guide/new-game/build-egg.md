---
title: "Build the new game Egg"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 110
audience: ["user","admin","ai"]
tags: ["new-game","build-egg"]
---

# Build the new game Egg

## Purpose

Přejdi Admin. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Přejdi Admin
2. Nests a vyber správnou skupinu
3. Definuj ověřený installer, image, startup a stop
4. Přidej validované variables a parser configu



## Verification

Nový DEV server se vytvoří z prázdných dat bez manuálního zásahu do kontejneru.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
