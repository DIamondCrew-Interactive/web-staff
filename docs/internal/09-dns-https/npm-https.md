---
title: "HTTPS in NPM"
category: 09-dns-https
categoryTitle: "DNS & HTTPS"
order: 174
audience: ["admin","ai"]
tags: ["npm-https"]
---

# HTTPS in NPM

## Purpose

Otevři SSL příslušného Proxy Hostu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejné A záznamy směřují na 51.254.46.124; TLS a HTTP routing řeší NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Otevři SSL příslušného Proxy Hostu
2. Zvol správné domain names
3. Vyžádej/obnov certifikát
4. Zapni Force SSL až po funkčním testu



## Verification

Žádná redirect smyčka nebo nesprávný certifikát pro jiný host.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
