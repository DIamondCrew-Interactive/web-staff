---
title: "Návrh firewallu"
category: 02-dia-nodes
categoryTitle: "Servery DIA"
order: 122
audience: ["admin","ai"]
tags: ["firewall"]
---

# Návrh firewallu

## K čemu slouží

Zachovej aktuální SSH management port a recovery konzoli.

## Kde a jak běží

Debian 12, dc-node01 / DIA-01 a nové game/control-plane nody.

## Postup

1. Zachovej aktuální SSH management port a recovery konzoli
2. Povol jen veřejné HTTP/HTTPS a skutečné game allocations
3. Hostové upstreamy omez na NPM
4. Docker published ports prověř i v Docker firewall chains

~~~bash
ss -ltnp
ss -lunp
sudo nft list ruleset
~~~

## Ověření výsledku

Z vnější sítě jsou dostupné jen zamýšlené služby; samotná pravidla hostového INPUT nemusí pokrýt Docker forwarding.

## Související návody

[Kategorie a navazující návody](index.md)
