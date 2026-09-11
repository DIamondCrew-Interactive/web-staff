---
title: "Služba Wings v systemd"
category: 04-wings
categoryTitle: "Wings"
order: 31
audience: ["admin","ai"]
tags: ["systemd"]
---

# Služba Wings v systemd

## K čemu slouží

Binárka je /usr/local/bin/wings.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Binárka je /usr/local/bin/wings
2. Nastav službu s WorkingDirectory /etc/pterodactyl a závislostí na Docker
3. Použij restart on failure

~~~bash
sudo systemctl daemon-reload
sudo systemctl enable --now wings
systemctl status wings --no-pager
~~~

## Ověření výsledku

Služba přežije plánovaný restart hostu.

## Související návody

[Kategorie a navazující návody](index.md)
