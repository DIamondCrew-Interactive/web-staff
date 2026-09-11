---
title: "Shared proxy network"
category: 14-docker
categoryTitle: "Docker & networking"
order: 194
audience: ["admin","ai"]
tags: ["shared-proxy"]
---

# Shared proxy network

## Purpose

External diamondcrew-proxy sdílejí NPM a weby. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Docker host, bridge sítě, pterodactyl0 a external diamondcrew-proxy mají různé úlohy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. External diamondcrew-proxy sdílejí NPM a weby
2. V Compose aplikace není třeba hostový port
3. V NPM použij service DNS name a interní 3000

~~~bash
docker network inspect diamondcrew-proxy
~~~



## Verification

Po recreate obou služeb routing dál funguje.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
