---
title: "Chyby SSL v NPM"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 155
audience: ["admin","ai"]
tags: ["ssl"]
---

# Chyby SSL v NPM

## K čemu slouží

Zkontroluj A/AAAA, expiry, challenge a certifikát přiřazený doméně.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. Zkontroluj A/AAAA, expiry, challenge a certifikát přiřazený doméně
2. Rozliš chybu TLS browser→NPM od TLS NPM→upstream

## Ověření výsledku

Veřejný HTTPS handshake projde bez -k.

## Související návody

[Kategorie a navazující návody](index.md)
