---
title: "Záloha Server Manageru"
category: 15-backups
categoryTitle: "Zálohování a obnova"
order: 198
audience: ["admin","ai"]
tags: ["server-manager"]
---

# Záloha Server Manageru

## K čemu slouží

Zálohuj panel DB, provozní config, verzi aplikace a branding.

## Kde a jak běží

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Postup

1. Zálohuj panel DB, provozní config, verzi aplikace a branding
2. APP_KEY a DB heslo patří do odděleného secure backupu
3. Nedávej je do Cookbooku

## Ověření výsledku

Izolovaná obnova dokáže dešifrovat data i otevřít panel.

## Související návody

[Kategorie a navazující návody](index.md)
