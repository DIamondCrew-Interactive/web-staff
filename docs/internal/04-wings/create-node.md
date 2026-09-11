---
title: "Create the DIA node"
category: 04-wings
categoryTitle: "Wings"
order: 29
audience: ["admin","ai"]
tags: ["create-node"]
---

# Create the DIA node

## Purpose

Admin. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Admin
2. Nodes
3. vytvoř node s vlastní identitou
4. FQDN dia-01.diamondcrew.net patří DIA-01
5. Veřejné HTTPS končí v NPM, daemon interně používá HTTP 8443



## Verification

Panel node komunikuje přes veřejný HTTPS endpoint; nepublikuj token.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
