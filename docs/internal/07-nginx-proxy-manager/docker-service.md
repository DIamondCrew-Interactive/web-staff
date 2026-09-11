---
title: "Proxy pro Docker službu"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 145
audience: ["admin","ai"]
tags: ["docker-service"]
---

# Proxy pro Docker službu

## K čemu slouží

Připoj službu i NPM ke společné external síti.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. Připoj službu i NPM ke společné external síti
2. Proxy Host používá service hostname a interní port
3. Hostový ports mapping není pro tento model nutný

## Ověření výsledku

Po recreate se DNS hostname nadále překládá.

## Související návody

[Kategorie a navazující návody](index.md)
