---
title: "NPM update"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 153
audience: ["admin","ai"]
tags: ["update"]
---

# NPM update

## Purpose

Zapiš image tag a zálohu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Zapiš image tag a zálohu
2. Vyber ověřenou verzi a přečti změny schema
3. Pull/build a recreate v NPM adresáři
4. Ověř hosty



## Verification

Při regresi vrať kompatibilní image a data; ne pouze image nad novým schema.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
