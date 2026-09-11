---
title: "Staff Center proxy"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 149
audience: ["admin","ai"]
tags: ["staff"]
---

# Staff Center proxy

## Purpose

staff.diamondcrew.net. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. staff.diamondcrew.net
2. HTTP staffcenter:3000
3. Bez povinné NPM Basic Auth
4. TLS cookie a Discord callback vyžadují veřejné HTTPS



## Verification

Anonymous homepage je 200, protected docs 401.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
