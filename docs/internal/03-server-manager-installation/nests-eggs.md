---
title: "Nests and Eggs administration"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 21
audience: ["admin","ai"]
tags: ["nests-eggs"]
---

# Nests and Eggs administration

## Purpose

Nest je skupina, Egg instalační/runtime recept. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Nest je skupina, Egg instalační/runtime recept
2. Minecraft může obsahovat Paper
3. Grand Theft Auto V může obsahovat DiamondCrew FiveM txAdmin
4. Importuj schválený Egg a otestuj na DEV



## Verification

Nová instalace, start, stop i reinstall jsou otestované bez přepsání PROD.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
