---
title: "Instalace NPM pomocí Dockeru"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 135
audience: ["admin","ai"]
tags: ["install-docker"]
---

# Instalace NPM pomocí Dockeru

## K čemu slouží

Nejdřív dokonči Docker install.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. Nejdřív dokonči Docker install
2. Zvol schválený NPM release image
3. Připrav samostatný Compose s persistent data a certs
4. Publikuj 80/443, administraci 81 omez dle sítě

## Ověření výsledku

docker compose ps je healthy a první login probíhá v chráněném přístupu.

## Související návody

[Kategorie a navazující návody](index.md)
