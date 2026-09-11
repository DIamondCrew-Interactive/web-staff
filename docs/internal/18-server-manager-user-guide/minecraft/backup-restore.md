---
title: "Minecraft backup and restore"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 70
audience: ["user","admin","ai"]
tags: ["minecraft","backup-restore"]
---

# Minecraft backup and restore

## Purpose

Zajisti konzistenci světa zastavením nebo dokumentovaným save postupem. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Zajisti konzistenci světa zastavením nebo dokumentovaným save postupem
2. Server
3. Backups
4. Create Backup
5. Restore zkus na testovacím serveru



## Verification

Obnovený svět, inventáře a rozšíření odpovídají očekávanému bodu obnovy.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
