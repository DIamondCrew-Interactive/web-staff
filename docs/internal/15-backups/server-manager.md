---
title: "Server Manager backup"
category: 15-backups
categoryTitle: "Backups & restore"
order: 198
audience: ["admin","ai"]
tags: ["server-manager"]
---

# Server Manager backup

## Purpose

Zálohuj panel DB, provozní config, verzi aplikace a branding. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Zálohuj panel DB, provozní config, verzi aplikace a branding
2. APP_KEY a DB heslo patří do odděleného secure backupu
3. Nedávej je do Cookbooku



## Verification

Izolovaná obnova dokáže dešifrovat data i otevřít panel.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
