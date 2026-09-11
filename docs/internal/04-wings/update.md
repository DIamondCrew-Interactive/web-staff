---
title: "Update Wings"
category: 04-wings
categoryTitle: "Wings"
order: 39
audience: ["admin","ai"]
tags: ["update"]
---

# Update Wings

## Purpose

Používaná baseline je 1.13.3. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Používaná baseline je 1.13.3
2. Ověř kompatibilitu s Panelem a konkrétní release asset podle CPU architektury
3. Uchovej binárku i konfiguraci
4. V údržbě vyměň a restartuj

~~~bash
/usr/local/bin/wings version
sudo systemctl restart wings
systemctl status wings --no-pager
~~~



## Verification

Panel, test server, console i SFTP fungují.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
