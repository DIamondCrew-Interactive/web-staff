---
title: "Docker pro Wings"
category: 04-wings
categoryTitle: "Wings"
order: 32
audience: ["admin","ai"]
tags: ["docker"]
---

# Docker pro Wings

## K čemu slouží

Nainstaluj Docker podle Docker kategorie.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Nainstaluj Docker podle Docker kategorie
2. Nepoužívej současně kolidující distro docker.io a docker-ce
3. Ověř oprávnění služby Wings

~~~bash
docker info
systemctl status docker --no-pager
~~~

## Ověření výsledku

docker info a test kontejneru fungují.

## Související návody

[Kategorie a navazující návody](index.md)
