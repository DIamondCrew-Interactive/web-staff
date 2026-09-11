---
title: "HTTPS certifikát v NPM"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 141
audience: ["admin","ai"]
tags: ["https"]
---

# HTTPS certifikát v NPM

## K čemu slouží

Ověř DNS a dosažitelnost challenge.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. Ověř DNS a dosažitelnost challenge
2. V SSL vyžádej certifikát pro přesné domény
3. Připoj ho k Proxy Hostu
4. Ověř expiry a obnovu

## Ověření výsledku

Browser důvěřuje celému certifikačnímu řetězci bez výjimky.

## Související návody

[Kategorie a navazující návody](index.md)
