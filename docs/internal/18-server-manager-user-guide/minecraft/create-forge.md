---
title: "Create Forge Minecraft"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 60
audience: ["user","admin","ai"]
tags: ["minecraft","create-forge"]
---

# Create Forge Minecraft

## Purpose

Admin. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Admin
2. Servers
3. Create New
4. Vyber ověřený Forge Egg pro konkrétní Minecraft verzi
5. Ověř Java požadavek u Forge release
6. Server i klient musí mít kompatibilní mods
7. Instaluj nejdřív prázdnou testovací instanci



## Verification

Čistý Forge startuje před přidáním modpacku, poté otestuj připojení s odpovídajícím klientem.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
