---
title: "DNS and TLS troubleshooting"
category: 09-dns-https
categoryTitle: "DNS & HTTPS"
order: 176
audience: ["admin","ai"]
tags: ["troubleshooting"]
---

# DNS and TLS troubleshooting

## Purpose

NXDOMAIN = chybějící DNS. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. NXDOMAIN = chybějící DNS
2. Špatná IP = record/cache
3. Cert name mismatch = NPM host/cert
4. 502 = upstream po TLS



## Verification

Oprav konkrétní vrstvu a znovu proveď stejný test.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
