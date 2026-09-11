---
title: "Garry's Mod server"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 75
audience: ["user","admin","ai"]
tags: ["source-engine","garrys-mod"]
---

# Garry's Mod server

## Purpose

Vyber ověřený Garry's Mod Egg. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Vyber ověřený Garry's Mod Egg
2. Ověř serverovou distribuci a potřebné content dependencies
3. Workshop/content konfiguraci testuj nejprve bez addonů



## Verification

Čistá mapa funguje a přidané addons nezpůsobují chybějící content.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
