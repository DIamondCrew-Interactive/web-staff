---
title: "Docker network map"
category: 01-getting-started
categoryTitle: "Getting started"
order: 117
audience: ["admin","ai"]
tags: ["network-map"]
---

# Docker network map

## Purpose

DIA-01 default bridge: 172.17.0.0/16. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Inventář, architektura a pravidla DiamondCrew.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. DIA-01 default bridge: 172.17.0.0/16
2. nginx-proxy-manager_default: 172.18.0.0/16
3. pterodactyl0: 172.19.0.0/16
4. NPM je také na diamondcrew-proxy
5. Subnet diamondcrew-proxy zjisti inspectem, nepředpokládej ho

~~~bash
docker network ls
docker network inspect $(docker network ls -q) --format '{{.Name}} -> {{range .IPAM.Config}}{{.Subnet}}{{end}}'
~~~



## Verification

Na novém hostu vybereš nekolidující subnet místo slepého kopírování.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
