---
title: "Proxy pro službu na hostiteli"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 144
audience: ["admin","ai"]
tags: ["host-service"]
---

# Proxy pro službu na hostiteli

## K čemu slouží

Zjisti hostovou adresu dosažitelnou z NPM.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. Zjisti hostovou adresu dosažitelnou z NPM
2. Volitelně použij extra_hosts host.docker.internal:host-gateway
3. Hostová služba musí poslouchat na dosažitelném interface a firewall povolit NPM

## Ověření výsledku

Request ze stejné Docker sítě dosáhne backend, ne container localhost.

## Související návody

[Kategorie a navazující návody](index.md)
