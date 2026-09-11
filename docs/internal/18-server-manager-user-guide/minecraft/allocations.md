---
title: "Minecraft allocations"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 62
audience: ["user","admin","ai"]
tags: ["minecraft","allocations"]
---

# Minecraft allocations

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
2. Nodes
3. DIA-01
4. Allocations
5. Vyhledej skutečně nepřiřazený port
6. 25565 je obvyklý výchozí port, nikoliv důkaz volného místa
7. Přiřaď jako primary



## Verification

Network a startup používají stejnou allocation; DNS SRV je samostatné nastavení.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
