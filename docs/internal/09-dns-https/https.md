---
title: "Create an HTTPS address"
category: 09-dns-https
categoryTitle: "DNS & HTTPS"
order: 172
audience: ["admin","ai"]
tags: ["https"]
---

# Create an HTTPS address

## Purpose

Nejdřív DNS a funkční backend. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Nejdřív DNS a funkční backend
2. NPM Proxy Host se správným scheme/forward host/port
3. WebSockets dle aplikace
4. Request Let's Encrypt
5. Force SSL



## Verification

curl bez -k i browser důvěřují certifikátu a otevřou správnou aplikaci.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
