---
title: "Test new game lifecycle"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 111
audience: ["user","admin","ai"]
tags: ["new-game","test-egg"]
---

# Test new game lifecycle

## Purpose

Testuj install/start/stop/restart/reinstall. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Testuj install/start/stop/restart/reinstall
2. Ověř více allocations, DNS, uživatelské permissions a persistence
3. Obnov backup do druhé DEV instance



## Verification

Znáš omezení každé operace a všechny požadované testy mají výsledek.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
