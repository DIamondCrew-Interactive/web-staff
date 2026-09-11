---
title: "Vytvoření Proxy Host"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 140
audience: ["admin","ai"]
tags: ["create-proxy-host"]
---

# Vytvoření Proxy Host

## K čemu slouží

NPM.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. NPM
2. Proxy Hosts
3. Add
4. Zadej přesnou doménu, scheme, forward host a port
5. WebSockets zapni jen když potřeba
6. Přidej certifikát

## Ověření výsledku

Přímý upstream i veřejný request vrací očekávanou aplikaci.

## Související návody

[Kategorie a navazující návody](index.md)
