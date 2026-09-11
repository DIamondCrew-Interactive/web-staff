---
title: "Migrate a Wings node"
category: 04-wings
categoryTitle: "Wings"
order: 40
audience: ["admin","ai"]
tags: ["migration"]
---

# Migrate a Wings node

## Purpose

Rozhodni náhrada identity vs nový node. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Rozhodni náhrada identity vs nový node
2. Zastav migrované hry
3. Přenes konzistentní volumes a chráněnou konfiguraci
4. Obnov allocations/firewall a přepni až po testu



## Verification

Na původním nodu neběží druhá zapisující kopie.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
