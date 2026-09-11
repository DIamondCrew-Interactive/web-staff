---
title: "Docker sítě pro NPM"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 138
audience: ["admin","ai"]
tags: ["docker-networks"]
---

# Docker sítě pro NPM

## K čemu slouží

NPM má nginx-proxy-manager_default a také diamondcrew-proxy.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. NPM má nginx-proxy-manager_default a také diamondcrew-proxy
2. Připojení zapiš trvale do Compose
3. Hostname staffcenter/public-status se překládá na shared síti

~~~bash
docker inspect nginx-proxy-manager_app_1 --format '{{json .NetworkSettings.Networks}}'
~~~

## Ověření výsledku

Oba webové upstreamy jsou z NPM dosažitelné.

## Související návody

[Kategorie a navazující návody](index.md)
