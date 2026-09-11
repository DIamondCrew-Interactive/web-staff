---
title: "Rozdíl mezi DNS a HTTP"
category: 09-dns-https
categoryTitle: "DNS a HTTPS"
order: 167
audience: ["admin","ai"]
tags: ["dns-basics"]
---

# Rozdíl mezi DNS a HTTP

## K čemu slouží

DNS překládá doménu na adresu.

## Kde a jak běží

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Postup

1. DNS překládá doménu na adresu
2. Webserver poskytuje obsah
3. Reverse proxy předává HTTP
4. Docker container je procesové prostředí
5. Port vybírá listener
6. Certifikát ověřuje HTTPS identitu

## Ověření výsledku

DNS sám neumí mapovat subdoménu na /var/www složku.

## Související návody

[Kategorie a navazující návody](index.md)
