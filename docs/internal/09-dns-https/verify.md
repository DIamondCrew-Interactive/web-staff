---
title: "Verify DNS and TLS"
category: 09-dns-https
categoryTitle: "DNS & HTTPS"
order: 175
audience: ["admin","ai"]
tags: ["verify"]
---

# Verify DNS and TLS

## Purpose

Ověř A/AAAA a přímý HTTPS request. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Ověř A/AAAA a přímý HTTPS request
2. Pro konkrétní cíl použij curl --resolve se správným Host/SNI
3. Nekontroluj veřejný TLS s -k

~~~bash
dig +short example.pmrp.cz A
curl -I https://example.pmrp.cz
curl --resolve example.pmrp.cz:443:51.254.46.124 -I https://example.pmrp.cz
~~~



## Verification

HTTPS vrací správný obsah a důvěryhodný řetězec.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
