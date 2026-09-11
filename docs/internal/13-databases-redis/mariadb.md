---
title: "Správa MariaDB"
category: 13-databases-redis
categoryTitle: "Databáze a Redis"
order: 188
audience: ["admin","ai"]
tags: ["mariadb"]
---

# Správa MariaDB

## K čemu slouží

Rozliš panel DB a databáze her.

## Kde a jak běží

MariaDB databáze panel a oddělené game databáze; Redis není náhradou trvalé DB.

## Postup

1. Rozliš panel DB a databáze her
2. Omez user hosty a grants
3. Před změnou schema zálohuj
4. Nesdílej root DB účet s hrou

~~~bash
sudo mariadb-admin ping
systemctl status mariadb --no-pager
~~~

## Ověření výsledku

mariadb-admin ping a aplikační spojení fungují.

## Související návody

[Kategorie a navazující návody](index.md)
