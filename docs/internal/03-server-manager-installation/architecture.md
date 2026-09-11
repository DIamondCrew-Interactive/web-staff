---
title: "Panel architecture"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 1
audience: ["admin","ai"]
tags: ["architecture"]
---

# Panel architecture

## Purpose

Odděl webový Panel od Wings. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Odděl webový Panel od Wings
2. NPM ukončuje HTTPS a předává request lokálnímu nginx
3. nginx posílá PHP do php8.3-fpm, Laravel používá MariaDB panel a Redis
4. pteroq zpracovává queue a cron spouští scheduler

~~~bash
systemctl is-active nginx php8.3-fpm mariadb redis-server pteroq
~~~



## Verification

Ověř veřejný login, stav pteroq a dosažitelnost nodu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
