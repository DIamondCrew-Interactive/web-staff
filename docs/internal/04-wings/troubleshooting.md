---
title: "Řešení problémů Wings"
category: 04-wings
categoryTitle: "Wings"
order: 43
audience: ["admin","ai"]
tags: ["troubleshooting"]
---

# Řešení problémů Wings

## K čemu slouží

Offline node rozliš na daemon stopped, TLS/proxy, chybnou identitu a Docker síť.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Offline node rozliš na daemon stopped, TLS/proxy, chybnou identitu a Docker síť
2. Restart není oprava chybné konfigurace
3. Nedovoluj permissions všem jako workaround

## Ověření výsledku

Po opravě proveď install/start/stop test na DEV.

## Související návody

[Kategorie a navazující návody](index.md)
