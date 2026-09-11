---
title: "Propagace DNS"
category: 09-dns-https
categoryTitle: "DNS a HTTPS"
order: 170
audience: ["admin","ai"]
tags: ["dns-propagation"]
---

# Propagace DNS

## K čemu slouží

Zjisti TTL starého záznamu.

## Kde a jak běží

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Postup

1. Zjisti TTL starého záznamu
2. Po změně porovnej authoritative resolver a běžné resolvery
3. Browser cache není jediná cache

## Ověření výsledku

Očekávaná adresa se vrací po uplynutí relevantních TTL.

## Související návody

[Kategorie a navazující návody](index.md)
