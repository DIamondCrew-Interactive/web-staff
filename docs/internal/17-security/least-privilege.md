---
title: "Least privilege"
category: 17-security
categoryTitle: "Security"
order: 212
audience: ["admin","ai"]
tags: ["least-privilege"]
---

# Least privilege

## Purpose

Odděl admin/client účty. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Nejnižší nutná oprávnění, ochrana secrets a veřejně bezpečný read-only Cookbook.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Odděl admin/client účty
2. Read-only monitoring token dej jen backendu
3. Subuser permissions přizpůsob úkolu
4. NPM veřejné staff stránce nepřidává povinnou Basic Auth



## Verification

Účet neumí více, než jeho úloha vyžaduje.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
