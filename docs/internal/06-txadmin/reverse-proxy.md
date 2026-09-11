---
title: "txAdmin public URL"
category: 06-txadmin
categoryTitle: "txAdmin"
order: 131
audience: ["admin","ai"]
tags: ["reverse-proxy"]
---

# txAdmin public URL

## Purpose

NPM tx-dev.pmrp.cz. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew monitor nad FXServer artifactem; NPM publikuje konzoli odděleně od hry.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. NPM tx-dev.pmrp.cz
2. host reachable allocation 33031
3. txAdmin
4. Zapni WebSockets a TLS, TXHOST_TXA_URL použije veřejné HTTPS URL



## Verification

Login i websocket session fungují bez 502 a mixed content.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
