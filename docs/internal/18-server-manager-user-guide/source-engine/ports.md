---
title: "Source game and query ports"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 79
audience: ["user","admin","ai"]
tags: ["source-engine","ports"]
---

# Source game and query ports

## Purpose

Přečti oficiální port requirements konkrétní hry. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Přečti oficiální port requirements konkrétní hry
2. Rozliš TCP/UDP, game/query/RCON
3. Vyhledej volné allocations a odpovídající firewall



## Verification

Klient i server browser/query fungují bez veřejného nechráněného RCON.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
