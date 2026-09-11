---
title: "Wings configuration"
category: 04-wings
categoryTitle: "Wings"
order: 30
audience: ["admin","ai"]
tags: ["config-yml"]
---

# Wings configuration

## Purpose

Konfiguraci generuje Panel. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Konfiguraci generuje Panel
2. Ulož ji do /etc/pterodactyl/config.yml s omezenými právy
3. Pro DIA-01 potvrď HTTP 0.0.0.0:8443, správné TLS/proxy nastavení a data path
4. Nekopíruj identitu na nový node

~~~bash
sudo chmod 600 /etc/pterodactyl/config.yml
sudo systemctl restart wings
~~~



## Verification

Wings startuje bez parse chyby a odpovídá Panelu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
