---
title: "Secret handling"
category: 17-security
categoryTitle: "Security"
order: 210
audience: ["admin","ai"]
tags: ["secrets"]
---

# Secret handling

## Purpose

Do Cookbooku smí jen placeholdery. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Nejnižší nutná oprávnění, ochrana secrets a veřejně bezpečný read-only Cookbook.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Do Cookbooku smí jen placeholdery
2. Nikdy neukládej hesla, tokens, APP_KEY, private keys, cookies ani recovery codes
3. Secrets přenášej přes schválené chráněné úložiště



## Verification

Secret scan proběhl před publikací; absence nálezu není důkaz úplné bezpečnosti.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
