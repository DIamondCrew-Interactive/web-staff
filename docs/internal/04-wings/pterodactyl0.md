---
title: "pterodactyl0"
category: 04-wings
categoryTitle: "Wings"
order: 34
audience: ["admin","ai"]
tags: ["pterodactyl0"]
---

# pterodactyl0

## Purpose

Na současném DIA-01 je 172.19.0.0/16. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Na současném DIA-01 je 172.19.0.0/16
2. Na novém stroji to není univerzální hodnota
3. Nedestruktivně inspectuj existující síť, její endpointy a kolize

~~~bash
docker network inspect pterodactyl0
~~~



## Verification

Vybraný subnet se nepřekrývá s hostem, VPN ani ostatními bridge sítěmi.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
