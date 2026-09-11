---
title: "Create a Nest"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 88
audience: ["user","admin","ai"]
tags: ["nests-eggs","create-nest"]
---

# Create a Nest

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
2. Nests
3. Create New
4. Zadej popis účelu a vlastníka
5. Nevytvářej duplicitní Nest, pokud už odpovídající existuje



## Verification

Nest lze vybrat při importu/create Egg.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
