---
title: "Panel filesystem permissions"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 12
audience: ["admin","ai"]
tags: ["permissions"]
---

# Panel filesystem permissions

## Purpose

PHP worker www-data musí číst aplikaci a zapisovat storage/bootstrap/cache. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. PHP worker www-data musí číst aplikaci a zapisovat storage/bootstrap/cache
2. Provozní .env není veřejný asset
3. Nepoužívej chmod 777 a nepřiděluj práva všem uživatelům

~~~bash
cd /var/www/pterodactyl
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R u+rwX,g+rX,o-rwx storage bootstrap/cache
sudo chown root:www-data .env
sudo chmod 640 .env
~~~



## Verification

Login a cache fungují bez permission denied; .env přes HTTP vrací 404/403.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
