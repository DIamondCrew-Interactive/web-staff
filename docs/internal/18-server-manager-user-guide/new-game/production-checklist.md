---
title: "Production readiness for a new game"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 112
audience: ["user","admin","ai"]
tags: ["new-game","production-checklist"]
---

# Production readiness for a new game

## Purpose

Potvrď vlastníka, licenci, limity, allocations, firewall, zálohy a monitoring. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Potvrď vlastníka, licenci, limity, allocations, firewall, zálohy a monitoring
2. Zapiš ověřené verze
3. Domluv servisní okno a rollback
4. Teprve potom založ PROD



## Verification

Vlastník se připojí a provozní tým umí obnovit poslední backup.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
