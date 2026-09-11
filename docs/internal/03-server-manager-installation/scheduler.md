---
title: "Panel scheduler"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 14
audience: ["admin","ai"]
tags: ["scheduler"]
---

# Panel scheduler

## Purpose

Vytvoř jednu cron definici pro artisan schedule:run každou minutu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Vytvoř jednu cron definici pro artisan schedule:run každou minutu
2. Pohlídej absolutní cestu a uživatele s právy k aplikaci
3. Nevytvářej paralelní duplicitní cron

~~~bash
sudo crontab -u www-data -e
~~~

Cron řádek: * * * * * /usr/bin/php /var/www/pterodactyl/artisan schedule:run >> /dev/null 2>&1

## Verification

Naplánovaná testovací úloha se spustí jednou ve správné časové zóně.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
