---
title: "Aktualizace NPM"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 153
audience: ["admin","ai"]
tags: ["update"]
---

# Aktualizace NPM

## K čemu slouží

Zapiš image tag a zálohu.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. Zapiš image tag a zálohu
2. Vyber ověřenou verzi a přečti změny schema
3. Pull/build a recreate v NPM adresáři
4. Ověř hosty

## Ověření výsledku

Při regresi vrať kompatibilní image a data; ne pouze image nad novým schema.

## Související návody

[Kategorie a navazující návody](index.md)
