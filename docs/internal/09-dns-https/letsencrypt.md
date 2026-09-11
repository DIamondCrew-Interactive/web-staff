---
title: "Let's Encrypt validation"
category: 09-dns-https
categoryTitle: "DNS & HTTPS"
order: 173
audience: ["admin","ai"]
tags: ["letsencrypt"]
---

# Let's Encrypt validation

## Purpose

Zvol podporovanou HTTP nebo DNS challenge. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Zvol podporovanou HTTP nebo DNS challenge
2. Pro HTTP ověř veřejné doručení challenge do NPM
3. Wildcard obvykle potřebuje DNS challenge a bezpečně uložený provider token



## Verification

Vydání i automatická obnova certifikátu mají ověřený výsledek.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
