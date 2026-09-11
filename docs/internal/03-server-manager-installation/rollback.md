---
title: "Panel rollback"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 26
audience: ["admin","ai"]
tags: ["rollback"]
---

# Panel rollback

## Purpose

Zastav nové zápisy. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Zastav nové zápisy
2. Vyber poslední kompatibilní app/DB/config sadu
3. Obnov ji do testovacího cíle a ověř
4. Teprve poté vrať produkční směrování



## Verification

Šifrovaná data jsou čitelná původním klíčem a workery používají správné schema.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
