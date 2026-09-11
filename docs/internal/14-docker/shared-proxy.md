---
title: "Sdílená síť pro proxy"
category: 14-docker
categoryTitle: "Docker a sítě"
order: 194
audience: ["admin","ai"]
tags: ["shared-proxy"]
---

# Sdílená síť pro proxy

## K čemu slouží

External diamondcrew-proxy sdílejí NPM a weby.

## Kde a jak běží

Docker host, bridge sítě, pterodactyl0 a external diamondcrew-proxy mají různé úlohy.

## Postup

1. External diamondcrew-proxy sdílejí NPM a weby
2. V Compose aplikace není třeba hostový port
3. V NPM použij service DNS name a interní 3000

~~~bash
docker network inspect diamondcrew-proxy
~~~

## Ověření výsledku

Po recreate obou služeb routing dál funguje.

## Související návody

[Kategorie a navazující návody](index.md)
