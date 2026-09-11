---
title: "Ověření pro Let's Encrypt"
category: 09-dns-https
categoryTitle: "DNS a HTTPS"
order: 173
audience: ["admin","ai"]
tags: ["letsencrypt"]
---

# Ověření pro Let's Encrypt

## K čemu slouží

Zvol podporovanou HTTP nebo DNS challenge.

## Kde a jak běží

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Postup

1. Zvol podporovanou HTTP nebo DNS challenge
2. Pro HTTP ověř veřejné doručení challenge do NPM
3. Wildcard obvykle potřebuje DNS challenge a bezpečně uložený provider token

## Ověření výsledku

Vydání i automatická obnova certifikátu mají ověřený výsledek.

## Související návody

[Kategorie a navazující návody](index.md)
