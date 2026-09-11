---
title: "Debian and runtime requirements"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 2
audience: ["admin","ai"]
tags: ["requirements"]
---

# Debian and runtime requirements

## Purpose

Použij Debian 12 a PHP 8.3 podle DiamondCrew baseline. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Použij Debian 12 a PHP 8.3 podle DiamondCrew baseline
2. Před instalací zkontroluj RAM, disk, architekturu a obsazené listenery
3. Nezaměň systémové předpoklady s herními limity

~~~bash
cat /etc/os-release
php -v
php -m
df -h
ss -ltnp
~~~



## Verification

Verze PHP a extensions odpovídají požadavkům cílového release.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
