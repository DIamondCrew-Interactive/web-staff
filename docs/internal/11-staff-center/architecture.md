---
title: "Staff Center architecture"
category: 11-staff-center
categoryTitle: "Staff Center"
order: 180
audience: ["admin","ai"]
tags: ["architecture"]
---

# Staff Center architecture

## Purpose

Veřejný web funguje bez Discordu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejný 4×2 rozcestník; Discord povoluje Cookbook UI na samostatné /docs. Homepage Cookbook nevykresluje. Header Documentation je viditelný jen allowlisted účtu. Express na 3000 za NPM. Infrastructure sekce odkazuje na Image Service na jiném VPS.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Veřejný web funguje bez Discordu
2. Backendové sessions autorizují Cookbook UI
3. Unlisted AI API čte stejný secret-free root bez loginu
4. NPM směřuje na staffcenter:3000



## Verification

Anonymous homepage 200, protected docs 401, AI read endpoint 200.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)

## Image Service
[Image Service / CDN](../22-image-service-cdn/index.md) má vlastní management a deployment.
