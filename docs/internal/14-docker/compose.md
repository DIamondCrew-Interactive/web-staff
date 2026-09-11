---
title: "Docker Compose operations"
category: 14-docker
categoryTitle: "Docker & networking"
order: 192
audience: ["admin","ai"]
tags: ["compose"]
---

# Docker Compose operations

## Purpose

Pracuj ve správném project adresáři. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Docker host, bridge sítě, pterodactyl0 a external diamondcrew-proxy mají různé úlohy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Pracuj ve správném project adresáři
2. docker compose config --quiet validuje bez vypsání secrets
3. Build vytvoří image, up -d aplikuje konfiguraci
4. Logs před sdílením rediguj

~~~bash
docker compose config --quiet
docker compose ps
~~~



## Verification

ps ukazuje očekávané kontejnery a healthcheck.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
