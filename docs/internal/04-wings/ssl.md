---
title: "TLS ve Wings"
category: 04-wings
categoryTitle: "Wings"
order: 38
audience: ["admin","ai"]
tags: ["ssl"]
---

# TLS ve Wings

## K čemu slouží

TLS je ukončené NPM, ne duplicitně stejným způsobem v daemonu.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. TLS je ukončené NPM, ne duplicitně stejným způsobem v daemonu
2. Zkontroluj Panel behind-proxy nastavení
3. Interní HTTP 8443 neotvírej nekontrolovaně do internetu

## Ověření výsledku

Žádný mixed content ani websocket TLS mismatch.

## Související návody

[Kategorie a navazující návody](index.md)
