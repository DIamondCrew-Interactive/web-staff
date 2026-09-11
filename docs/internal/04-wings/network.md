---
title: "Síťové nastavení Wings"
category: 04-wings
categoryTitle: "Wings"
order: 33
audience: ["admin","ai"]
tags: ["network"]
---

# Síťové nastavení Wings

## K čemu slouží

Zmapuj všechna Docker subnety.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Zmapuj všechna Docker subnety
2. Vyber nepřekrývající se rozsah
3. Aktualizuj Wings network config jen v údržbě
4. Zachovej dostupnost panelu a allocations

~~~bash
docker network ls
docker network inspect $(docker network ls -q) --format '{{.Name}} -> {{range .IPAM.Config}}{{.Subnet}}{{end}}'
~~~

## Ověření výsledku

Testovací hra má outbound DNS a inbound port.

## Související návody

[Kategorie a navazující návody](index.md)
