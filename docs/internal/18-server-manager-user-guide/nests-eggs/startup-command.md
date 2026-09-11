---
title: "Egg startup command"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 93
audience: ["user","admin","ai"]
tags: ["nests-eggs","startup-command"]
---

# Egg startup command

## Purpose

Příkaz používá existující executable v runtime image. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Příkaz používá existující executable v runtime image
2. Variables dosazuj podle syntaxe Panelu
3. Rozliš working directory a artifact layout
4. Staré instance zkontroluj samostatně



## Verification

Příkaz se spustí v /home/container a neopírá se o soubory mimo persistence.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
