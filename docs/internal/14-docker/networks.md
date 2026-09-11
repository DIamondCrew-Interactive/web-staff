---
title: "Kontrola Docker sítí"
category: 14-docker
categoryTitle: "Docker a sítě"
order: 193
audience: ["admin","ai"]
tags: ["networks"]
---

# Kontrola Docker sítí

## K čemu slouží

Nejdřív ls/inspect.

## Kde a jak běží

Docker host, bridge sítě, pterodactyl0 a external diamondcrew-proxy mají různé úlohy.

## Postup

1. Nejdřív ls/inspect
2. Zaznamenej název, subnet a připojené endpointy
3. Síťové kolize neopravuj smazáním všech sítí

~~~bash
docker network ls
docker network inspect $(docker network ls -q) --format '{{.Name}} -> {{range .IPAM.Config}}{{.Subnet}}{{end}}'
~~~

## Ověření výsledku

Každá služba má očekávanou síť a žádný překryv.

## Související návody

[Kategorie a navazující návody](index.md)
