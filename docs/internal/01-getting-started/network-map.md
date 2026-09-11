---
title: "Přehled Docker sítí"
category: 01-getting-started
categoryTitle: "Začínáme"
order: 117
audience: ["admin","ai"]
tags: ["network-map"]
---

# Přehled Docker sítí

## K čemu slouží

DIA-01 default bridge: 172.17.0.0/16.

## Kde a jak běží

Inventář, architektura a pravidla DiamondCrew.

## Postup

1. DIA-01 default bridge: 172.17.0.0/16
2. nginx-proxy-manager_default: 172.18.0.0/16
3. pterodactyl0: 172.19.0.0/16
4. NPM je také na diamondcrew-proxy
5. Subnet diamondcrew-proxy zjisti inspectem, nepředpokládej ho

~~~bash
docker network ls
docker network inspect $(docker network ls -q) --format '{{.Name}} -> {{range .IPAM.Config}}{{.Subnet}}{{end}}'
~~~

## Ověření výsledku

Na novém hostu vybereš nekolidující subnet místo slepého kopírování.

## Související návody

[Kategorie a navazující návody](index.md)
