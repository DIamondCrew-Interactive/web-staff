---
title: "Create an Egg from scratch"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 90
audience: ["user","admin","ai"]
tags: ["nests-eggs","create-egg-from-scratch"]
---

# Create an Egg from scratch

## Purpose

Ověř oficiální instalaci, runtime a porty hry. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Ověř oficiální instalaci, runtime a porty hry
2. Vytvoř DEV Egg v existujícím Nestu
3. Definuj image, instalační script, variables, startup a stop
4. Exportuj verzovaný JSON



## Verification

Celý životní cyklus funguje a data přežijí restart.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
