---
title: "Řešení problémů webhostingu"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 166
audience: ["admin","ai"]
tags: ["troubleshooting"]
---

# Řešení problémů webhostingu

## K čemu slouží

404 řeš root/server_name/try_files.

## Kde a jak běží

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Postup

1. 404 řeš root/server_name/try_files
2. 502 řeš FPM nebo upstream
3. 403 řeš permissions a index
4. Port conflict řeš listenery

## Ověření výsledku

nginx -t projde a správný Host vrací očekávanou stránku.

## Související návody

[Kategorie a navazující návody](index.md)
