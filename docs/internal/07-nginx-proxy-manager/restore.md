---
title: "Obnova NPM"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 152
audience: ["admin","ai"]
tags: ["restore"]
---

# Obnova NPM

## K čemu slouží

Obnov verzi kompatibilní s datovou zálohou.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. Obnov verzi kompatibilní s datovou zálohou
2. Obnov mounts a sítě
3. Otestuj upstreamy před DNS přepnutím

## Ověření výsledku

Všechny certifikáty a Proxy Hosts jsou dostupné a nepřesměrovávají na staré neplatné IP.

## Související návody

[Kategorie a navazující návody](index.md)
