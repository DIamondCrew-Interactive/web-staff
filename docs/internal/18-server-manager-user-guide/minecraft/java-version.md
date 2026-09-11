---
title: "Select Java version"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 63
audience: ["user","admin","ai"]
tags: ["minecraft","java-version"]
---

# Select Java version

## Purpose

Zjisti přesnou verzi Minecraft/Paper/Forge. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Zjisti přesnou verzi Minecraft/Paper/Forge
2. V oficiální dokumentaci ověř požadovanou Java
3. Vyber kompatibilní schválenou Docker image
4. Nepředpokládej jednu Java pro všechny verze



## Verification

Console nehlásí UnsupportedClassVersionError a runtime opravdu běží vybranou Javou.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
