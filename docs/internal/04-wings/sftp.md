---
title: "SFTP ve Wings"
category: 04-wings
categoryTitle: "Wings"
order: 35
audience: ["admin","ai"]
tags: ["sftp"]
---

# SFTP ve Wings

## K čemu slouží

Použij port 2022 a údaje z klientského SFTP panelu.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Použij port 2022 a údaje z klientského SFTP panelu
2. Heslo se nezapisuje do Cookbooku
3. Firewall povolí pouze požadovaný přístup

~~~bash
ss -ltnp | grep :2022
~~~

## Ověření výsledku

SFTP klient nahraje a stáhne neškodný testovací soubor.

## Související návody

[Kategorie a navazující návody](index.md)
