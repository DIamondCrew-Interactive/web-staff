---
title: "Trvalá data NPM"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 137
audience: ["admin","ai"]
tags: ["persistent-data"]
---

# Trvalá data NPM

## K čemu slouží

Data NPM a /etc/letsencrypt musí být perzistentní.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. Data NPM a /etc/letsencrypt musí být perzistentní
2. Nespouštěj novou image bez původních mounts
3. Zálohuj DB/data a certifikáty konzistentně

## Ověření výsledku

Recreate kontejneru zachová hosty a certifikáty.

## Související návody

[Kategorie a navazující návody](index.md)
