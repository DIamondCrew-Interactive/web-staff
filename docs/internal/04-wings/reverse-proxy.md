---
title: "Reverse proxy pro Wings"
category: 04-wings
categoryTitle: "Wings"
order: 37
audience: ["admin","ai"]
tags: ["reverse-proxy"]
---

# Reverse proxy pro Wings

## K čemu slouží

NPM dia-01.diamondcrew.net směřuje HTTP na dosažitelnou hostovou adresu :8443.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. NPM dia-01.diamondcrew.net směřuje HTTP na dosažitelnou hostovou adresu :8443
2. Zapni WebSockets a TLS certifikát
3. Panel musí generovat veřejné HTTPS adresy

~~~bash
curl -I https://dia-01.diamondcrew.net
~~~

## Ověření výsledku

Konzole i soubory fungují; 401 na chráněné API pro anonymous není samo o sobě výpadek.

## Související návody

[Kategorie a navazující návody](index.md)
