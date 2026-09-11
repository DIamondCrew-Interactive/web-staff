---
title: "Lokální webová aplikace"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 161
audience: ["admin","ai"]
tags: ["local-app"]
---

# Lokální webová aplikace

## K čemu slouží

Aplikace běží jako omezený systemd uživatel na ověřeném interním portu.

## Kde a jak běží

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Postup

1. Aplikace běží jako omezený systemd uživatel na ověřeném interním portu
2. NPM používá host reachable address
3. Nastav restart policy a healthcheck

## Ověření výsledku

systemd status a přímý HTTP health odpovídají, pak i veřejná doména.

## Související návody

[Kategorie a navazující návody](index.md)
