---
title: "Oprava překryvu síťových rozsahů"
category: 04-wings
categoryTitle: "Wings"
order: 42
audience: ["admin","ai"]
tags: ["pool-overlaps"]
---

# Oprava překryvu síťových rozsahů

## K čemu slouží

Chyba Pool overlaps with other one on this address space znamená kolizi Docker subnetu.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Chyba Pool overlaps with other one on this address space znamená kolizi Docker subnetu
2. Inspectuj všechny sítě před změnou
3. Připrav volný rozsah
4. Uprav Wings config a nahraď pouze dotčenou prázdnou síť v údržbě

~~~bash
docker network inspect $(docker network ls -q) --format '{{.Name}} -> {{range .IPAM.Config}}{{.Subnet}}{{end}}'
~~~

## Ověření výsledku

Wings startuje a všechny dotčené hry mají síť; žádný blanket docker network prune.

## Související návody

[Kategorie a navazující návody](index.md)
