---
title: "Panel local nginx"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 15
audience: ["admin","ai"]
tags: ["local-nginx"]
---

# Panel local nginx

## Purpose

Web root musí být /var/www/pterodactyl/public, ne kořen aplikace. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Web root musí být /var/www/pterodactyl/public, ne kořen aplikace
2. Použij PHP FPM socket a Laravel try_files
3. Zvol volný interní HTTP port a dovol přístup NPM

~~~bash
sudo nginx -t
sudo systemctl reload nginx
ss -ltnp
~~~



## Verification

Lokální request se správným Host i veřejný HTTPS login fungují.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
