---
title: "Logy webu"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 164
audience: ["admin","ai"]
tags: ["logs"]
---

# Logy webu

## K čemu slouží

Zjisti přístupový a error log příslušného vhostu.

## Kde a jak běží

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Postup

1. Zjisti přístupový a error log příslušného vhostu
2. Porovnej čas requestu s NPM a aplikačním logem
3. Neposílej OAuth callback query, cookies ani env do veřejné diagnostiky

~~~bash
sudo journalctl -u nginx -n 50 --no-pager
~~~

## Ověření výsledku

Stejný request lze sledovat přes vrstvy bez vyzrazení tajemství.

## Související návody

[Kategorie a navazující návody](index.md)
