---
title: "Práce s Docker Compose"
category: 14-docker
categoryTitle: "Docker a sítě"
order: 192
audience: ["admin","ai"]
tags: ["compose"]
---

# Práce s Docker Compose

## K čemu slouží

Pracuj ve správném project adresáři.

## Kde a jak běží

Docker host, bridge sítě, pterodactyl0 a external diamondcrew-proxy mají různé úlohy.

## Postup

1. Pracuj ve správném project adresáři
2. docker compose config --quiet validuje bez vypsání secrets
3. Build vytvoří image, up -d aplikuje konfiguraci
4. Logs před sdílením rediguj

~~~bash
docker compose config --quiet
docker compose ps
~~~

## Ověření výsledku

ps ukazuje očekávané kontejnery a healthcheck.

## Související návody

[Kategorie a navazující návody](index.md)
