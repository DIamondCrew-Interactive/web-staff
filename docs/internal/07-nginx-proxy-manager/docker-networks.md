---
title: "NPM Docker networks"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 138
audience: ["admin","ai"]
tags: ["docker-networks"]
---

# NPM Docker networks

## Purpose

NPM má nginx-proxy-manager_default a také diamondcrew-proxy. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. NPM má nginx-proxy-manager_default a také diamondcrew-proxy
2. Připojení zapiš trvale do Compose
3. Hostname staffcenter/public-status se překládá na shared síti

~~~bash
docker inspect nginx-proxy-manager_app_1 --format '{{json .NetworkSettings.Networks}}'
~~~



## Verification

Oba webové upstreamy jsou z NPM dosažitelné.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
