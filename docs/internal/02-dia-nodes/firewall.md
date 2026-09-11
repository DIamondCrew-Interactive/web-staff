---
title: "Host firewall planning"
category: 02-dia-nodes
categoryTitle: "DIA nodes"
order: 122
audience: ["admin","ai"]
tags: ["firewall"]
---

# Host firewall planning

## Purpose

Zachovej aktuální SSH management port a recovery konzoli. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Debian 12, dc-node01 / DIA-01 a nové game/control-plane nody.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Zachovej aktuální SSH management port a recovery konzoli
2. Povol jen veřejné HTTP/HTTPS a skutečné game allocations
3. Hostové upstreamy omez na NPM
4. Docker published ports prověř i v Docker firewall chains

~~~bash
ss -ltnp
ss -lunp
sudo nft list ruleset
~~~



## Verification

Z vnější sítě jsou dostupné jen zamýšlené služby; samotná pravidla hostového INPUT nemusí pokrýt Docker forwarding.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
