---
title: "SteamCMD installation example"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 105
audience: ["user","admin","ai"]
tags: ["new-game","steamcmd-example"]
---

# SteamCMD installation example

## Purpose

Ověř dedicated App ID a způsob loginu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Ověř dedicated App ID a způsob loginu
2. Použij šablonu níže až po nahrazení placeholderu
3. Před validate zálohuj upravené distribuované soubory

~~~text
steamcmd +force_install_dir /mnt/server +login anonymous +app_update <verified-dedicated-app-id> validate +quit
~~~
Anonymous použij jen pokud jej daný produkt podporuje. Toto není konkrétní App ID ani autorizace licence.

## Verification

Instalační log odpovídá očekávanému dedicated produktu.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
