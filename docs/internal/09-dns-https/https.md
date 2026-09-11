---
title: "Vytvoření HTTPS adresy"
category: 09-dns-https
categoryTitle: "DNS a HTTPS"
order: 172
audience: ["admin","ai"]
tags: ["https"]
---

# Vytvoření HTTPS adresy

## K čemu slouží

Nejdřív DNS a funkční backend.

## Kde a jak běží

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Postup

1. Nejdřív DNS a funkční backend
2. NPM Proxy Host se správným scheme/forward host/port
3. WebSockets dle aplikace
4. Request Let's Encrypt
5. Force SSL

## Ověření výsledku

curl bez -k i browser důvěřují certifikátu a otevřou správnou aplikaci.

## Související návody

[Kategorie a navazující návody](index.md)
