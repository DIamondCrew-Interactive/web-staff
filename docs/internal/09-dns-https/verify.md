---
title: "Ověření DNS a TLS"
category: 09-dns-https
categoryTitle: "DNS a HTTPS"
order: 175
audience: ["admin","ai"]
tags: ["verify"]
---

# Ověření DNS a TLS

## K čemu slouží

Ověř A/AAAA a přímý HTTPS request.

## Kde a jak běží

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Postup

1. Ověř A/AAAA a přímý HTTPS request
2. Pro konkrétní cíl použij curl --resolve se správným Host/SNI
3. Nekontroluj veřejný TLS s -k

~~~bash
dig +short example.pmrp.cz A
curl -I https://example.pmrp.cz
curl --resolve example.pmrp.cz:443:51.254.46.124 -I https://example.pmrp.cz
~~~

## Ověření výsledku

HTTPS vrací správný obsah a důvěryhodný řetězec.

## Související návody

[Kategorie a navazující návody](index.md)
