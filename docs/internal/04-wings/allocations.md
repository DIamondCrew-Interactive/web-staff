---
title: "Herní porty ve Wings"
category: 04-wings
categoryTitle: "Wings"
order: 36
audience: ["admin","ai"]
tags: ["allocations"]
---

# Herní porty ve Wings

## K čemu slouží

Herní allocations spravuj v Panelu na správném nodu.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Herní allocations spravuj v Panelu na správném nodu
2. Odděl game a txAdmin port
3. Ověř TCP i UDP a případné hostové listenery

~~~bash
ss -ltnp
ss -lunp
docker ps --format 'table {{.Names}}	{{.Ports}}'
~~~

## Ověření výsledku

Pterodactyl vlastník portu a hostový listener odpovídají.

## Související návody

[Kategorie a navazující návody](index.md)
