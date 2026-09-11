---
title: "New game workflow"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 103
audience: ["user","admin","ai"]
tags: ["new-game","index"]
---

# New game workflow

## Purpose

Identifikuj přesný software. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Identifikuj přesný software
2. Ověř Linux podporu a oficiální instalační metodu
3. Zjisti runtime/ports/config/start/stop
4. Vyber nebo vytvoř Egg
5. DEV test
6. Backup
7. PROD



## Verification

Install/start/stop/restart/reinstall/network/restore jsou doložené, ne odhadnuté.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
