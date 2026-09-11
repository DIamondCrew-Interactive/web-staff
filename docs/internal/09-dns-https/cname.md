---
title: "Záznamy CNAME"
category: 09-dns-https
categoryTitle: "DNS a HTTPS"
order: 169
audience: ["admin","ai"]
tags: ["cname"]
---

# Záznamy CNAME

## K čemu slouží

CNAME je alias na jinou doménu, ne URL s protokolem/portem.

## Kde a jak běží

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Postup

1. CNAME je alias na jinou doménu, ne URL s protokolem/portem
2. Použij ho jen tam, kde je podporovaný DNS providerem
3. Nekombinuj s konfliktním A na stejném jménu

## Ověření výsledku

Resolver dojde na správný adresní záznam bez smyčky.

## Související návody

[Kategorie a navazující návody](index.md)
