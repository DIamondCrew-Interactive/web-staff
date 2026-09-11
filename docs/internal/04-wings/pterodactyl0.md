---
title: "pterodactyl0"
category: 04-wings
categoryTitle: "Wings"
order: 34
audience: ["admin","ai"]
tags: ["pterodactyl0"]
---

# pterodactyl0

## K čemu slouží

Na současném DIA-01 je 172.19.0.0/16.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Na současném DIA-01 je 172.19.0.0/16
2. Na novém stroji to není univerzální hodnota
3. Nedestruktivně inspectuj existující síť, její endpointy a kolize

~~~bash
docker network inspect pterodactyl0
~~~

## Ověření výsledku

Vybraný subnet se nepřekrývá s hostem, VPN ani ostatními bridge sítěmi.

## Související návody

[Kategorie a navazující návody](index.md)
