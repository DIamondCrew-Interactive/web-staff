---
title: "Counter-Strike server"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 74
audience: ["user","admin","ai"]
tags: ["source-engine","counter-strike"]
---

# Counter-Strike server

## Purpose

Urči konkrétní generaci Counter-Strike. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Urči konkrétní generaci Counter-Strike
2. Ověř dedicated produkt a Linux podporu
3. Použij odpovídající Egg a jeho skutečné porty
4. Nesdílej recept mezi odlišnými engine verzemi



## Verification

Správný klient se připojí na testovací mapu a restart zachová config.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
