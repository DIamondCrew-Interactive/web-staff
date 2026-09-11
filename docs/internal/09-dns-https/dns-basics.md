---
title: "DNS versus HTTP"
category: 09-dns-https
categoryTitle: "DNS & HTTPS"
order: 167
audience: ["admin","ai"]
tags: ["dns-basics"]
---

# DNS versus HTTP

## Purpose

DNS překládá doménu na adresu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. DNS překládá doménu na adresu
2. Webserver poskytuje obsah
3. Reverse proxy předává HTTP
4. Docker container je procesové prostředí
5. Port vybírá listener
6. Certifikát ověřuje HTTPS identitu



## Verification

DNS sám neumí mapovat subdoménu na /var/www složku.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
