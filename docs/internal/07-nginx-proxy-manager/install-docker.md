---
title: "Install NPM with Docker"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 135
audience: ["admin","ai"]
tags: ["install-docker"]
---

# Install NPM with Docker

## Purpose

Nejdřív dokonči Docker install. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Nejdřív dokonči Docker install
2. Zvol schválený NPM release image
3. Připrav samostatný Compose s persistent data a certs
4. Publikuj 80/443, administraci 81 omez dle sítě



## Verification

docker compose ps je healthy a první login probíhá v chráněném přístupu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
