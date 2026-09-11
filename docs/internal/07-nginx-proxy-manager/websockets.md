---
title: "WebSockets"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 143
audience: ["admin","ai"]
tags: ["websockets"]
---

# WebSockets

## K čemu slouží

Konzole Panelu, Wings a txAdmin mohou potřebovat websocket upgrade.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. Konzole Panelu, Wings a txAdmin mohou potřebovat websocket upgrade
2. Zapni podporu na příslušném Proxy Hostu
3. Ověř browser Network WS a backend

## Ověření výsledku

Spojení upgraduje a zůstává připojené, běžné 200 HTML samo nestačí.

## Související návody

[Kategorie a navazující návody](index.md)
