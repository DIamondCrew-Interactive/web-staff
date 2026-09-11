---
title: "Proxy pro Staff Center"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 149
audience: ["admin","ai"]
tags: ["staff"]
---

# Proxy pro Staff Center

## K čemu slouží

Zpřístupní Staff Center na `https://staff.diamondcrew.net` přes NPM.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. V NPM otevři **Proxy Hosts** a příslušný záznam pro `staff.diamondcrew.net`.
2. Nastav **Scheme** na `http`, **Forward Hostname / IP** na `staffcenter` a **Forward Port** na `3000`.
3. Veřejnou stránku nech dostupnou bez Basic Auth. Přístup k dokumentaci ověřuje aplikace přes Discord.
4. Zkontroluj HTTPS certifikát. Zabezpečené cookies a Discord callback vyžadují veřejné HTTPS.

## Ověření výsledku

Bez přihlášení musí homepage vrátit HTTP `200` a chráněná dokumentace HTTP `401`.

## Související návody

[Kategorie a navazující návody](index.md)
