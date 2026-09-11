---
title: "Architektura NPM"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 134
audience: ["admin","ai"]
tags: ["architecture"]
---

# Architektura NPM

## K čemu slouží

NPM přijímá veřejný HTTP/HTTPS.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. NPM přijímá veřejný HTTP/HTTPS
2. Proxy Host vybírá upstream podle domény
3. Container hostname funguje jen na společné Docker síti
4. Hostová služba není localhost NPM kontejneru

## Ověření výsledku

Rozumíš, kde se ukončuje TLS a kam request pokračuje.

## Související návody

[Kategorie a navazující návody](index.md)
