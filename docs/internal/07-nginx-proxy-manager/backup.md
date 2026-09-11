---
title: "NPM backup"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 151
audience: ["admin","ai"]
tags: ["backup"]
---

# NPM backup

## Purpose

Zálohuj databázi/data společně s certifikáty. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Zálohuj databázi/data společně s certifikáty
2. Ulož image tag a Compose
3. Citlivé části patří do šifrovaného offsite úložiště



## Verification

Testovací NPM načte hosty a certifikáty, záloha není pouze prázdný adresář.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
