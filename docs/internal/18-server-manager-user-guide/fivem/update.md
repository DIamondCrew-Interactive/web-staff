---
title: "FiveM update from the panel"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 84
audience: ["user","admin","ai"]
tags: ["fivem","update"]
---

# FiveM update from the panel

## Purpose

Uchovej artifact a monitor verzi. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Uchovej artifact a monitor verzi
2. Zálohuj txData/server-data a herní DB
3. Otestuj nový artifact plus custom monitor na DEV
4. Ověř startup existující instance



## Verification

Žádná chyba /home/container/FXServer: No such file or directory; hráči se připojí.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
