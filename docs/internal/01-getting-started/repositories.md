---
title: "GitHub repositories and versions"
category: 01-getting-started
categoryTitle: "Getting started"
order: 118
audience: ["admin","ai"]
tags: ["repositories"]
---

# GitHub repositories and versions

## Purpose

web-servermanager je DiamondCrew reskin. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Inventář, architektura a pravidla DiamondCrew.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. web-servermanager je DiamondCrew reskin
2. fivem-txadmindc je custom monitor
3. web-staff je tento web
4. Výchozí Panel v1.15.1 a Wings v1.13.3 jsou baseline, ne záruka věčného latest

Repozitáře: https://github.com/DIamondCrew-Interactive/web-servermanager · https://github.com/DIamondCrew-Interactive/fivem-txadmindc · https://github.com/DIamondCrew-Interactive/web-staff

## Verification

Pro zásah máš konkrétní commit/tag a release asset.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
