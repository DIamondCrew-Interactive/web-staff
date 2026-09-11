---
title: "Update a game server"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 56
audience: ["user","admin","ai"]
tags: ["servers","update"]
---

# Update a game server

## Purpose

Urči runtime, resources a config, které se mění. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Urči runtime, resources a config, které se mění
2. Zálohuj
3. Otestuj update na DEV
4. V servisním okně aplikuj stejnou ověřenou změnu na PROD



## Verification

Připojení hráče a uložení světa/mapy fungují; máš cestu zpět.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
