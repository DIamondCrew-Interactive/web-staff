---
title: "Konfigurace server block v nginx"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 159
audience: ["admin","ai"]
tags: ["nginx-server-block"]
---

# Konfigurace server block v nginx

## K čemu slouží

Použij server_name odpovídající doméně a správný root.

## Kde a jak běží

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Postup

1. Použij server_name odpovídající doméně a správný root
2. Zvol volný interní port po ss -ltnp
3. Validuj nginx -t před reload

~~~bash
sudo nginx -t
sudo systemctl reload nginx
~~~

## Ověření výsledku

Lokální request s Host najde správný vhost.

## Související návody

[Kategorie a navazující návody](index.md)
