---
title: "DNS před nastavením NPM"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 139
audience: ["admin","ai"]
tags: ["dns-prerequisites"]
---

# DNS před nastavením NPM

## K čemu slouží

A záznam příslušné domény směřuje na 51.254.46.124.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. A záznam příslušné domény směřuje na 51.254.46.124
2. Nezakládej nefunkční AAAA
3. Před certifikátem ověř DNS zvenčí

~~~bash
dig +short panel.diamondcrew.net A
~~~

## Ověření výsledku

Resolver vrací správný cíl a porty 80/443 vedou do NPM.

## Související návody

[Kategorie a navazující návody](index.md)
