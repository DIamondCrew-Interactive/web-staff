---
title: "Wings TLS model"
category: 04-wings
categoryTitle: "Wings"
order: 38
audience: ["admin","ai"]
tags: ["ssl"]
---

# Wings TLS model

## Purpose

TLS je ukončené NPM, ne duplicitně stejným způsobem v daemonu. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. TLS je ukončené NPM, ne duplicitně stejným způsobem v daemonu
2. Zkontroluj Panel behind-proxy nastavení
3. Interní HTTP 8443 neotvírej nekontrolovaně do internetu



## Verification

Žádný mixed content ani websocket TLS mismatch.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
