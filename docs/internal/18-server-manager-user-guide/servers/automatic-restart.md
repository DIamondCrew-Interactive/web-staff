---
title: "Schedule a restart"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 52
audience: ["user","admin","ai"]
tags: ["servers","automatic-restart"]
---

# Schedule a restart

## Purpose

Server. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Server
2. Schedules
3. Přidej oznamovací herní command, pokud ho hra podporuje
4. Potom naplánuj restart s odstupem
5. Nepoužívej vymyšlený save command



## Verification

Hráči dostanou zprávu a proces se po restartu vrátí online bez ztráty uložených dat.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
