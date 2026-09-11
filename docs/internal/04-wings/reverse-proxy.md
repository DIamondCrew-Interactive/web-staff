---
title: "Wings reverse proxy"
category: 04-wings
categoryTitle: "Wings"
order: 37
audience: ["admin","ai"]
tags: ["reverse-proxy"]
---

# Wings reverse proxy

## Purpose

NPM dia-01.diamondcrew.net směřuje HTTP na dosažitelnou hostovou adresu :8443. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. NPM dia-01.diamondcrew.net směřuje HTTP na dosažitelnou hostovou adresu :8443
2. Zapni WebSockets a TLS certifikát
3. Panel musí generovat veřejné HTTPS adresy

~~~bash
curl -I https://dia-01.diamondcrew.net
~~~



## Verification

Konzole i soubory fungují; 401 na chráněné API pro anonymous není samo o sobě výpadek.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
