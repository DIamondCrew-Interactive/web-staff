---
title: "Fix pool overlaps"
category: 04-wings
categoryTitle: "Wings"
order: 42
audience: ["admin","ai"]
tags: ["pool-overlaps"]
---

# Fix pool overlaps

## Purpose

Chyba Pool overlaps with other one on this address space znamená kolizi Docker subnetu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Chyba Pool overlaps with other one on this address space znamená kolizi Docker subnetu
2. Inspectuj všechny sítě před změnou
3. Připrav volný rozsah
4. Uprav Wings config a nahraď pouze dotčenou prázdnou síť v údržbě

~~~bash
docker network inspect $(docker network ls -q) --format '{{.Name}} -> {{range .IPAM.Config}}{{.Subnet}}{{end}}'
~~~



## Verification

Wings startuje a všechny dotčené hry mají síť; žádný blanket docker network prune.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
