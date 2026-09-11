---
title: "Proxy pro txAdmin"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 148
audience: ["admin","ai"]
tags: ["txadmin"]
---

# Proxy pro txAdmin

## K čemu slouží

tx-dev.pmrp.cz.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. tx-dev.pmrp.cz
2. allocation 33031
3. Prismatic DEV txAdmin
4. PROD a DCRP mají jiné přidělené porty

## Ověření výsledku

Konzole odpovídá správnému prostředí, ne omylem PROD.

## Související návody

[Kategorie a navazující návody](index.md)
