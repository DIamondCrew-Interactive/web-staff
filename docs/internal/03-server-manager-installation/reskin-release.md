---
title: "Reskin release selection"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 23
audience: ["admin","ai"]
tags: ["reskin-release"]
---

# Reskin release selection

## Purpose

Na GitHubu zkontroluj přesný release a jeho assets. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Na GitHubu zkontroluj přesný release a jeho assets
2. Vyber diamondcrew-server-manager-1.15.1.tar.gz a checksum
3. Nezaměň zdrojový archive s hotovým build assetem
4. Release publikace sama nenasazuje

~~~bash
curl -fsSL https://api.github.com/repos/DIamondCrew-Interactive/web-servermanager/releases/latest | jq -r ' .tag_name, (.assets[] | .name)'
~~~



## Verification

Checksum sedí a cílová baseline odpovídá.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
