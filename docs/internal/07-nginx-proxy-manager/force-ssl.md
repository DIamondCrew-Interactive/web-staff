---
title: "Vynucení HTTPS (Force SSL)"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 142
audience: ["admin","ai"]
tags: ["force-ssl"]
---

# Vynucení HTTPS (Force SSL)

## K čemu slouží

Po ověření certifikátu zapni Force SSL.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. Po ověření certifikátu zapni Force SSL
2. Aplikace musí důvěřovat správné reverse proxy a generovat HTTPS URL
3. Nedávej veřejný scheme HTTP do callbacku

## Ověření výsledku

HTTP přesměruje na HTTPS bez nekonečné redirect smyčky.

## Související návody

[Kategorie a navazující návody](index.md)
