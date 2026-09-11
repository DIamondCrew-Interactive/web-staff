---
title: "Verified Panel download"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 7
audience: ["admin","ai"]
tags: ["download"]
---

# Verified Panel download

## Purpose

Cílová baseline je Pterodactyl v1.15.1. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Cílová baseline je Pterodactyl v1.15.1
2. Přes GitHub release API vyber panel.tar.gz z přesného tagu
3. Ověř dostupný release digest nebo schválený SHA256 a prohlédni obsah taru
4. Nerozbaluj neověřený archiv přes živou instalaci

~~~bash
curl -fsSL https://api.github.com/repos/pterodactyl/panel/releases/tags/v1.15.1 | jq -r ' .assets[] | [.name, .browser_download_url, .digest] | @tsv'
~~~



## Verification

Archiv odpovídá tagu; aplikace po instalaci hlásí 1.15.1.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
