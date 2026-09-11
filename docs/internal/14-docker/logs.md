---
title: "Logy kontejnerů"
category: 14-docker
categoryTitle: "Docker a sítě"
order: 195
audience: ["admin","ai"]
tags: ["logs"]
---

# Logy kontejnerů

## K čemu slouží

Použij compose logs pro konkrétní službu a omezený čas/počet řádků.

## Kde a jak běží

Docker host, bridge sítě, pterodactyl0 a external diamondcrew-proxy mají různé úlohy.

## Postup

1. Použij compose logs pro konkrétní službu a omezený čas/počet řádků
2. Zkontroluj restart count a health
3. Nezveřejňuj docker inspect .Config.Env

~~~bash
docker compose logs --tail=80 staffcenter
docker compose ps
~~~

## Ověření výsledku

Máš příčinu problému bez credential dumpu.

## Související návody

[Kategorie a navazující návody](index.md)
