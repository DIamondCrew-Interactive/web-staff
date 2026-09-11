---
title: "Cockpit proxy"
category: 10-cockpit
categoryTitle: "Cockpit"
order: 178
audience: ["admin","ai"]
tags: ["proxy"]
---

# Cockpit proxy

## Purpose

admin.diamondcrew.net. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Host management mimo Panel: admin.diamondcrew.net, 9090, cockpit.socket.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. admin.diamondcrew.net
2. NPM
3. host:9090 HTTPS
4. Ověř povolené origins a WebSockets
5. Cockpit spravuje hostové účty, Discord login webu je nenahrazuje



## Verification

Přihlášení hostu a terminál fungují; -k patří jen lokální diagnostice self-signed upstreamu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
