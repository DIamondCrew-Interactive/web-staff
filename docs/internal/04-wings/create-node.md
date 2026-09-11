---
title: "Vytvoření DIA nodu"
category: 04-wings
categoryTitle: "Wings"
order: 29
audience: ["admin","ai"]
tags: ["create-node"]
---

# Vytvoření DIA nodu

## K čemu slouží

Admin.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Admin
2. Nodes
3. vytvoř node s vlastní identitou
4. FQDN dia-01.diamondcrew.net patří DIA-01
5. Veřejné HTTPS končí v NPM, daemon interně používá HTTP 8443

## Ověření výsledku

Panel node komunikuje přes veřejný HTTPS endpoint; nepublikuj token.

## Související návody

[Kategorie a navazující návody](index.md)
