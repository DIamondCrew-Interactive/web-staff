---
title: "Local Redis"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 5
audience: ["admin","ai"]
tags: ["redis"]
---

# Local Redis

## Purpose

Nainstaluj redis-server pro lokální cache a queue. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Nainstaluj redis-server pro lokální cache a queue
2. Neotvírej Redis veřejné síti
3. Pokud použiješ ACL, doplň credentials bezpečně do aplikace, ne do návodu

~~~bash
sudo apt-get install redis-server
sudo systemctl enable --now redis-server
redis-cli ping
~~~



## Verification

Lokální PING odpoví PONG; pteroq běží.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
