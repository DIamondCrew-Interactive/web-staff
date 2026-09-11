---
title: "Řešení problémů DNS a TLS"
category: 09-dns-https
categoryTitle: "DNS a HTTPS"
order: 176
audience: ["admin","ai"]
tags: ["troubleshooting"]
---

# Řešení problémů DNS a TLS

## K čemu slouží

NXDOMAIN = chybějící DNS.

## Kde a jak běží

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Postup

1. NXDOMAIN = chybějící DNS
2. Špatná IP = record/cache
3. Cert name mismatch = NPM host/cert
4. 502 = upstream po TLS

## Ověření výsledku

Oprav konkrétní vrstvu a znovu proveď stejný test.

## Související návody

[Kategorie a navazující návody](index.md)
