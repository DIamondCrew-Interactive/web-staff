---
title: "Client interface"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 44
audience: ["user","admin","ai"]
tags: ["interface-overview"]
---

# Client interface

## Purpose

Na panel.diamondcrew.net otevři svůj server. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Na panel.diamondcrew.net otevři svůj server
2. Console řídí proces, Files data, Startup recept spuštění
3. Network ukazuje allocations, Backups zálohy a Users delegaci



## Verification

Rozpoznáš správný server a jeho stav, nepleteš si PROD s DEV.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](index.md)
