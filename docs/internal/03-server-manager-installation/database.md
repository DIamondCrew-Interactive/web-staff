---
title: "Panel database"
category: 03-server-manager-installation
categoryTitle: "Server Manager installation"
order: 6
audience: ["admin","ai"]
tags: ["database"]
---

# Panel database

## Purpose

Vytvoř samostatnou databázi panel a aplikačního uživatele. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Vytvoř samostatnou databázi panel a aplikačního uživatele
2. Oprávnění omez na panel.* a skutečný source host
3. DB heslo vlož jen do interaktivního konfigurátoru a chráněného env

~~~bash
sudo mariadb
~~~

SQL šablona ve Fresh install používá placeholder, který před provedením nahraď bezpečně.

## Verification

Panel provede DB spojení a migrations; nevypisuj heslo.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
