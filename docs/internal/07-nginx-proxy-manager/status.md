---
title: "Proxy pro veřejný status"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 150
audience: ["admin","ai"]
tags: ["status"]
---

# Proxy pro veřejný status

## K čemu slouží

status.diamondcrew.net.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. status.diamondcrew.net
2. HTTP public-status:3000
3. Nesměruj veřejný status na staff kontejner
4. Zachovej společný brand

## Ověření výsledku

Status nemá admin dlaždice, session ani Cookbook API.

## Související návody

[Kategorie a navazující návody](index.md)
