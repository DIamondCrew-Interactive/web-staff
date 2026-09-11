---
title: "Proxy pro Cockpit"
category: 10-cockpit
categoryTitle: "Cockpit"
order: 178
audience: ["admin","ai"]
tags: ["proxy"]
---

# Proxy pro Cockpit

## K čemu slouží

admin.diamondcrew.net.

## Kde a jak běží

Host management mimo Panel: admin.diamondcrew.net, 9090, cockpit.socket.

## Postup

1. admin.diamondcrew.net
2. NPM
3. host:9090 HTTPS
4. Ověř povolené origins a WebSockets
5. Cockpit spravuje hostové účty, Discord login webu je nenahrazuje

## Ověření výsledku

Přihlášení hostu a terminál fungují; -k patří jen lokální diagnostice self-signed upstreamu.

## Související návody

[Kategorie a navazující návody](index.md)
