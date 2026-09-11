---
title: "Find the server App ID"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 78
audience: ["user","admin","ai"]
tags: ["source-engine","steam-app-id"]
---

# Find the server App ID

## Purpose

Použij oficiální dedikovaný server návod výrobce/Valve. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Použij oficiální dedikovaný server návod výrobce/Valve
2. Ověř, že ID patří serveru, nikoliv store klientovi
3. Zaznamenej zdroj a datum ověření do change recordu



## Verification

ID je doložené, není odhad podle podobného názvu.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
