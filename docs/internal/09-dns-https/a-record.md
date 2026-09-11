---
title: "Create an A record"
category: 09-dns-https
categoryTitle: "DNS & HTTPS"
order: 168
audience: ["admin","ai"]
tags: ["a-record"]
---

# Create an A record

## Purpose

U DNS správce přidej A pro vybranou subdoménu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. U DNS správce přidej A pro vybranou subdoménu
2. Pro služby na DIA-01 cíl 51.254.46.124
3. Ověř AAAA, pokud existuje, nepublikuj nefunkční IPv6

~~~bash
dig +short example.pmrp.cz A
~~~



## Verification

Externí resolver vrátí správné A.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
