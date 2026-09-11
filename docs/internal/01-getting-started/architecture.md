---
title: "Architecture summary"
category: 01-getting-started
categoryTitle: "Getting started"
order: 113
audience: ["admin","ai"]
tags: ["architecture"]
---

# Architecture summary

## Purpose

DIA-01 / dc-node01 běží na Debianu 12 a veřejné IP 51.254.46.124. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Inventář, architektura a pravidla DiamondCrew.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. DIA-01 / dc-node01 běží na Debianu 12 a veřejné IP 51.254.46.124
2. NPM ukončuje HTTPS
3. Lokální nginx/PHP obsluhuje Panel, Wings řídí game kontejnery
4. Staff a Status jsou samostatné kontejnery na diamondcrew-proxy



## Verification

Veřejný webový request nezaměňuješ s herním TCP/UDP ani s SSH.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
