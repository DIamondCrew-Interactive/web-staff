---
title: "Vytvoření A záznamu"
category: 09-dns-https
categoryTitle: "DNS a HTTPS"
order: 168
audience: ["admin","ai"]
tags: ["a-record"]
---

# Vytvoření A záznamu

## K čemu slouží

U DNS správce přidej A pro vybranou subdoménu.

## Kde a jak běží

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Postup

1. U DNS správce přidej A pro vybranou subdoménu
2. Pro služby na DIA-01 cíl 51.254.46.124
3. Ověř AAAA, pokud existuje, nepublikuj nefunkční IPv6

~~~bash
dig +short example.pmrp.cz A
~~~

## Ověření výsledku

Externí resolver vrátí správné A.

## Související návody

[Kategorie a navazující návody](index.md)
