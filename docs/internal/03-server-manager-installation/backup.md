---
title: "Panel backup"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 25
audience: ["admin","ai"]
tags: ["backup"]
---

# Panel backup

## Purpose

Naplánuj konzistentní zálohu panel DB. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Naplánuj konzistentní zálohu panel DB
2. Ulož konfiguraci a její secrets odděleně šifrovaně
3. Zachovej verzi aplikace a branding manifest
4. Otestuj obnovu izolovaně



## Verification

Záloha má čitelný manifest, checksum a zaznamenaný restore test.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
