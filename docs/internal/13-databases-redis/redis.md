---
title: "Redis operations"
category: 13-databases-redis
categoryTitle: "Databases & Redis"
order: 189
audience: ["admin","ai"]
tags: ["redis"]
---

# Redis operations

## Purpose

Redis používá Panel pro cache/queue. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

MariaDB databáze panel a oddělené game databáze; Redis není náhradou trvalé DB.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Redis používá Panel pro cache/queue
2. Zkontroluj lokální listener, paměť a případné ACL
3. Nepoužívej flushall jako univerzální opravu

~~~bash
redis-cli ping
systemctl status redis-server --no-pager
~~~



## Verification

redis-cli ping odpoví a queue worker dokončí test task.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
