---
title: "Domain map"
category: 01-getting-started
categoryTitle: "Getting started"
order: 115
audience: ["admin","ai"]
tags: ["domain-map"]
---

# Domain map

## Purpose

panel.diamondcrew.net = Server Manager. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Inventář, architektura a pravidla DiamondCrew.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. panel.diamondcrew.net = Server Manager
2. dia-01.diamondcrew.net = Wings
3. proxy.diamondcrew.net = NPM
4. admin.diamondcrew.net = Cockpit
5. staff.diamondcrew.net a status.diamondcrew.net = weby
6. tx.pmrp.cz / tx-dev.pmrp.cz / tx.dcrp.cz / tx-dev.dcrp.cz = příslušné konzole



## Verification

DNS a certifikát ověř pro přesnou doménu, ne podle podobnosti jména.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
