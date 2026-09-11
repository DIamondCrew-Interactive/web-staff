---
title: "pteroq queue worker"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 13
audience: ["admin","ai"]
tags: ["queue-worker"]
---

# pteroq queue worker

## Purpose

Vytvoř pteroq.service podle Fresh install. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Vytvoř pteroq.service podle Fresh install
2. Worker běží jako www-data a závisí na Redis
3. Aktivuj službu
4. Po změně release restartuj workery

~~~bash
sudo systemctl daemon-reload
sudo systemctl enable --now pteroq
cd /var/www/pterodactyl
php artisan queue:restart
systemctl status pteroq --no-pager
~~~



## Verification

Služba je active a testovaná queued akce se dokončí.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
