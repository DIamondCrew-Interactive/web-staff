---
title: "Wings systemd"
category: 04-wings
categoryTitle: "Wings"
order: 31
audience: ["admin","ai"]
tags: ["systemd"]
---

# Wings systemd

## Purpose

Binárka je /usr/local/bin/wings. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Binárka je /usr/local/bin/wings
2. Nastav službu s WorkingDirectory /etc/pterodactyl a závislostí na Docker
3. Použij restart on failure

~~~bash
sudo systemctl daemon-reload
sudo systemctl enable --now wings
systemctl status wings --no-pager
~~~



## Verification

Služba přežije plánovaný restart hostu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
