---
title: "NPM restore"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 152
audience: ["admin","ai"]
tags: ["restore"]
---

# NPM restore

## Purpose

Obnov verzi kompatibilní s datovou zálohou. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Obnov verzi kompatibilní s datovou zálohou
2. Obnov mounts a sítě
3. Otestuj upstreamy před DNS přepnutím



## Verification

Všechny certifikáty a Proxy Hosts jsou dostupné a nepřesměrovávají na staré neplatné IP.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
