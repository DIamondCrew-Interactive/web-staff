---
title: "Determine required ports"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 107
audience: ["user","admin","ai"]
tags: ["new-game","determine-ports"]
---

# Determine required ports

## Purpose

Ze skutečné dokumentace zjisti game/query/RCON a TCP/UDP. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Ze skutečné dokumentace zjisti game/query/RCON a TCP/UDP
2. Zkontroluj hostové listenery i Panel allocations
3. Požádej správce o chybějící allocation



## Verification

Herní klient i query fungují a admin port není veřejně bez ochrany.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
