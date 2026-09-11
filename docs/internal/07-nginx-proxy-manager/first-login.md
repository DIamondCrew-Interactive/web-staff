---
title: "NPM first login"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 136
audience: ["admin","ai"]
tags: ["first-login"]
---

# NPM first login

## Purpose

Otevři administraci dle ověřené konkrétní verze NPM. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Otevři administraci dle ověřené konkrétní verze NPM
2. Dokonči její aktuální onboarding
3. Nastav vlastní správcovský účet bezpečně
4. Nevkládej historické default credentials do návodu



## Verification

Správce může vytvořit Proxy Host; konzole není nechráněně přístupná cizím.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
