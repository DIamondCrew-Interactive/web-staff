---
title: "Příklad instalace přes SteamCMD"
category: 18-server-manager-user-guide
categoryTitle: "Používání Server Manageru"
order: 105
audience: ["user","admin","ai"]
tags: ["new-game","steamcmd-example"]
---

# Příklad instalace přes SteamCMD

## K čemu slouží

Ověř dedicated App ID a způsob loginu.

## Kde a co nastavit

1. Ověř dedicated App ID a způsob loginu
2. Použij šablonu níže až po nahrazení placeholderu
3. Před validate zálohuj upravené distribuované soubory

~~~text
steamcmd +force_install_dir /mnt/server +login anonymous +app_update <verified-dedicated-app-id> validate +quit
~~~
Anonymous použij jen pokud jej daný produkt podporuje. Toto není konkrétní App ID ani autorizace licence.

## Ověření výsledku

Instalační log odpovídá očekávanému dedicated produktu.

## Související návody

[Kategorie a navazující návody](../index.md)
