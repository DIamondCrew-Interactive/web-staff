---
title: "Předpoklady pro Wings"
category: 04-wings
categoryTitle: "Wings"
order: 28
audience: ["admin","ai"]
tags: ["requirements"]
---

# Předpoklady pro Wings

## K čemu slouží

Potvrď Debian 12, architekturu a Docker.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Potvrď Debian 12, architekturu a Docker
2. Ověř dostupný disk a žádný kolidující subnet
3. Zjisti dostupnou verzi Panelu

~~~bash
uname -m
docker version
df -h
~~~

## Ověření výsledku

Docker i požadovaná architektura jsou podporované.

## Související návody

[Kategorie a navazující návody](index.md)
