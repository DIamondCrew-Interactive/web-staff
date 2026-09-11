---
title: "DNS propagation"
category: 09-dns-https
categoryTitle: "DNS & HTTPS"
order: 170
audience: ["admin","ai"]
tags: ["dns-propagation"]
---

# DNS propagation

## Purpose

Zjisti TTL starého záznamu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Zjisti TTL starého záznamu
2. Po změně porovnej authoritative resolver a běžné resolvery
3. Browser cache není jediná cache



## Verification

Očekávaná adresa se vrací po uplynutí relevantních TTL.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
