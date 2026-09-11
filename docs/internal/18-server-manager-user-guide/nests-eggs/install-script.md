---
title: "Write an install script"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 92
audience: ["user","admin","ai"]
tags: ["nests-eggs","install-script"]
---

# Write an install script

## Purpose

Installer běží v instalačním prostředí s datovým mountem. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Installer běží v instalačním prostředí s datovým mountem
2. Používej ověřené downloads a kontrolované výstupní cesty
3. Chybová instalace musí skončit nenulovým kódem
4. Reinstall musí mít známý dopad



## Verification

Prázdná instalace i řízený reinstall mají očekávané soubory bez secrets v logu.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
