---
title: "Discord OAuth setup"
category: 11-staff-center
categoryTitle: "Staff Center"
order: 181
audience: ["admin","ai"]
tags: ["discord-oauth"]
---

# Discord OAuth setup

## Purpose

V Developer Portal vytvoř aplikaci. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejný rozcestník; Discord povoluje Cookbook UI. Express na 3000 za NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. V Developer Portal vytvoř aplikaci
2. Zaregistruj https://staff.diamondcrew.net/auth/discord/callback
3. Client ID/Secret a allowlist vlož do serverového env
4. SESSION_SECRET generuj bezpečně



## Verification

Povolený účet otevře UI, nepovolený vidí jen No internal access a logout ruší session.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
