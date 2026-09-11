---
title: "Create a subdomain"
category: 09-dns-https
categoryTitle: "DNS & HTTPS"
order: 171
audience: ["admin","ai"]
tags: ["new-subdomain"]
---

# Create a subdomain

## Purpose

Vyber schválené jméno. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Vyber schválené jméno
2. Vytvoř A/CNAME
3. Připrav fungující backend
4. NPM Proxy Host
5. HTTPS
6. Verification



## Verification

DNS, HTTP routing a certifikát odpovídají témuž jménu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
