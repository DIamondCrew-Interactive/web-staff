---
title: "Update Minecraft"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 69
audience: ["user","admin","ai"]
tags: ["minecraft","update"]
---

# Update Minecraft

## Purpose

Přečti změny hry, Java a rozšíření. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Přečti změny hry, Java a rozšíření
2. Zálohuj svět a konfiguraci
3. Ověř konverzi světa na DEV
4. Na PROD aktualizuj pouze schválenou kombinaci



## Verification

Nový svět lze uložit a hráč se připojí; downgrade převedeného světa není automaticky bezpečný.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
