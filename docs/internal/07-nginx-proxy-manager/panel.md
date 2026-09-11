---
title: "Proxy pro panel"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 146
audience: ["admin","ai"]
tags: ["panel"]
---

# Proxy pro panel

## K čemu slouží

panel.diamondcrew.net.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. panel.diamondcrew.net
2. NPM
3. local nginx/Pterodactyl
4. Forward port zjisti ze skutečného nginx configu, není v inventáři pevně zadaný

## Ověření výsledku

Login, static assets a HTTPS URL fungují.

## Související návody

[Kategorie a navazující návody](index.md)
