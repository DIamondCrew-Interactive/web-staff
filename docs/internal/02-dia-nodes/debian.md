---
title: "Základní nastavení Debianu"
category: 02-dia-nodes
categoryTitle: "Servery DIA"
order: 120
audience: ["admin","ai"]
tags: ["debian"]
---

# Základní nastavení Debianu

## K čemu slouží

DIA-01 je Debian 12 s hostname dc-node01.

## Kde a jak běží

Debian 12, dc-node01 / DIA-01 a nové game/control-plane nody.

## Postup

1. DIA-01 je Debian 12 s hostname dc-node01
2. Na novém hostu potvrď OS a architekturu
3. Aktualizaci/reboot dělej s konzolovým recovery přístupem

~~~bash
cat /etc/os-release
uname -m
sudo apt-get update
sudo apt-get upgrade
~~~

## Ověření výsledku

Po restartu existuje administrátorské spojení a očekávané disky.

## Související návody

[Kategorie a navazující návody](index.md)
