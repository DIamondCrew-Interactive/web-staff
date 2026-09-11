---
title: "Aktualizace Wings"
category: 04-wings
categoryTitle: "Wings"
order: 39
audience: ["admin","ai"]
tags: ["update"]
---

# Aktualizace Wings

## K čemu slouží

Používaná baseline je 1.13.3.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Používaná baseline je 1.13.3
2. Ověř kompatibilitu s Panelem a konkrétní release asset podle CPU architektury
3. Uchovej binárku i konfiguraci
4. V údržbě vyměň a restartuj

~~~bash
/usr/local/bin/wings version
sudo systemctl restart wings
systemctl status wings --no-pager
~~~

## Ověření výsledku

Panel, test server, console i SFTP fungují.

## Související návody

[Kategorie a navazující návody](index.md)
