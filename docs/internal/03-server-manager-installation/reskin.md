---
title: "DiamondCrew reskin"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 22
audience: ["admin","ai"]
tags: ["reskin"]
---

# DiamondCrew reskin

## Purpose

Použij DIamondCrew-Interactive/web-servermanager. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Použij DIamondCrew-Interactive/web-servermanager
2. Ujisti se, že asset cílí Panel 1.15.1
3. Zálohuj původní frontend a manifest
4. Aplikuj release podle jeho vlastního ověřeného návodu



## Verification

Login, client i admin fungují; frontend manifest a assety jsou ze stejného buildu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
