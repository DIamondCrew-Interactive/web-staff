---
title: "Debian baseline"
category: 02-dia-nodes
categoryTitle: "DIA nodes"
order: 120
audience: ["admin","ai"]
tags: ["debian"]
---

# Debian baseline

## Purpose

DIA-01 je Debian 12 s hostname dc-node01. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Debian 12, dc-node01 / DIA-01 a nové game/control-plane nody.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. DIA-01 je Debian 12 s hostname dc-node01
2. Na novém hostu potvrď OS a architekturu
3. Aktualizaci/reboot dělej s konzolovým recovery přístupem

~~~bash
cat /etc/os-release
uname -m
sudo apt-get update
sudo apt-get upgrade
~~~



## Verification

Po restartu existuje administrátorské spojení a očekávané disky.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
