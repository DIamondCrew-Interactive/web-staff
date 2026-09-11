---
title: "Wings troubleshooting"
category: 04-wings
categoryTitle: "Wings"
order: 43
audience: ["admin","ai"]
tags: ["troubleshooting"]
---

# Wings troubleshooting

## Purpose

Offline node rozliš na daemon stopped, TLS/proxy, chybnou identitu a Docker síť. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Offline node rozliš na daemon stopped, TLS/proxy, chybnou identitu a Docker síť
2. Restart není oprava chybné konfigurace
3. Nedovoluj permissions všem jako workaround



## Verification

Po opravě proveď install/start/stop test na DEV.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
