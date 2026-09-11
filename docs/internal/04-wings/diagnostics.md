---
title: "Diagnostika Wings"
category: 04-wings
categoryTitle: "Wings"
order: 41
audience: ["admin","ai"]
tags: ["diagnostics"]
---

# Diagnostika Wings

## K čemu slouží

Nejdřív ověř službu a Docker.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Nejdřív ověř službu a Docker
2. Pak DNS/TLS veřejného endpointu
3. Nakonec konkrétní allocation a herní proces

~~~bash
systemctl status wings docker --no-pager
journalctl -u wings -n 80 --no-pager
~~~

## Ověření výsledku

Testovací server se instaluje, spouští a korektně zastavuje.

## Související návody

[Kategorie a navazující návody](index.md)
