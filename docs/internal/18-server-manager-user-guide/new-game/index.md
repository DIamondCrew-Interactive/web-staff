---
title: "Přidání nové hry"
category: 18-server-manager-user-guide
categoryTitle: "Používání Server Manageru"
order: 103
audience: ["user","admin","ai"]
tags: ["new-game","index"]
---

# Přidání nové hry

## K čemu slouží

Identifikuj přesný software.

## Pro koho

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Kde a jak běží

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Než začneš

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## Kde a co nastavit

1. Identifikuj přesný software
2. Ověř Linux podporu a oficiální instalační metodu
3. Zjisti runtime/ports/config/start/stop
4. Vyber nebo vytvoř Egg
5. DEV test
6. Backup
7. PROD

## Ověření výsledku

Install/start/stop/restart/reinstall/network/restore jsou doložené, ne odhadnuté.

## Aktualizace a rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Řešení problémů

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Související návody

[Kategorie a navazující návody](../index.md)
