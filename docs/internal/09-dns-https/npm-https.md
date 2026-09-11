---
title: "HTTPS v NPM"
category: 09-dns-https
categoryTitle: "DNS a HTTPS"
order: 174
audience: ["admin","ai"]
tags: ["npm-https"]
---

# HTTPS v NPM

## K čemu slouží

Otevři SSL příslušného Proxy Hostu.

## Kde a jak běží

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Postup

1. Otevři SSL příslušného Proxy Hostu
2. Zvol správné domain names
3. Vyžádej/obnov certifikát
4. Zapni Force SSL až po funkčním testu

## Ověření výsledku

Žádná redirect smyčka nebo nesprávný certifikát pro jiný host.

## Související návody

[Kategorie a navazující návody](index.md)
