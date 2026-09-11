---
title: "Why is my server not running?"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 57
audience: ["user","admin","ai"]
tags: ["servers","not-running"]
---

# Why is my server not running?

## Purpose

Otevři Console a poslední install log. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Otevři Console a poslední install log
2. Rozliš installing, offline, starting, crash
3. Zkontroluj Startup, Files, Network a limity
4. Redigovaný log předej správci



## Verification

Příčina je identifikovaná před reinstall/resetem. Exit 127 typicky vede ke kontrole executable a jeho závislostí.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
