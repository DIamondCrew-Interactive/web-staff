---
title: "Cockpit update and rollback"
category: 10-cockpit
categoryTitle: "Cockpit"
order: 179
audience: ["admin","ai"]
tags: ["update"]
---

# Cockpit update and rollback

## Purpose

Zálohuj config a zapiš verzi balíčku. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Host management mimo Panel: admin.diamondcrew.net, 9090, cockpit.socket.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Zálohuj config a zapiš verzi balíčku
2. Aktualizuj přes apt po kontrole candidate
3. Ověř socket/login
4. Při regresi vrať ověřený balíček nebo systémový snapshot

~~~bash
apt-cache policy cockpit
systemctl status cockpit.socket --no-pager
~~~



## Verification

SSH recovery cesta zůstává k dispozici.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
