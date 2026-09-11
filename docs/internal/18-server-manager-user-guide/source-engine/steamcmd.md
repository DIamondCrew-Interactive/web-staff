---
title: "SteamCMD workflow"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 77
audience: ["user","admin","ai"]
tags: ["source-engine","steamcmd"]
---

# SteamCMD workflow

## Purpose

Rozliš anonymní a autentizovanou instalaci. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Rozliš anonymní a autentizovanou instalaci
2. Ověř App ID a licenční podmínky
3. force_install_dir nastav před login/app_update
4. validate může přepsat distribuované soubory



## Verification

Instalační log potvrzuje přesný produkt a očekávaný executable.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
