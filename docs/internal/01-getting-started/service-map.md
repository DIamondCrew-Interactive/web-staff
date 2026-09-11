---
title: "Service map"
category: 01-getting-started
categoryTitle: "Getting started"
order: 114
audience: ["admin","ai"]
tags: ["service-map"]
---

# Service map

## Purpose

Panel: /var/www/pterodactyl, PHP 8.3, MariaDB panel, Redis, pteroq.service. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Inventář, architektura a pravidla DiamondCrew.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Panel: /var/www/pterodactyl, PHP 8.3, MariaDB panel, Redis, pteroq.service
2. Wings: /usr/local/bin/wings, /etc/pterodactyl/config.yml, wings.service
3. NPM: nginx-proxy-manager_app_1
4. Cockpit: cockpit.socket

~~~bash
systemctl status nginx php8.3-fpm mariadb redis-server pteroq wings cockpit.socket --no-pager
~~~



## Verification

Každý zásah má určený host, službu a datový adresář.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
