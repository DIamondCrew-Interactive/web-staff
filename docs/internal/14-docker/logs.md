---
title: "Container logs"
category: 14-docker
categoryTitle: "Docker & networking"
order: 195
audience: ["admin","ai"]
tags: ["logs"]
---

# Container logs

## Purpose

Použij compose logs pro konkrétní službu a omezený čas/počet řádků. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Docker host, bridge sítě, pterodactyl0 a external diamondcrew-proxy mají různé úlohy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Použij compose logs pro konkrétní službu a omezený čas/počet řádků
2. Zkontroluj restart count a health
3. Nezveřejňuj docker inspect .Config.Env

~~~bash
docker compose logs --tail=80 staffcenter
docker compose ps
~~~



## Verification

Máš příčinu problému bez credential dumpu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
