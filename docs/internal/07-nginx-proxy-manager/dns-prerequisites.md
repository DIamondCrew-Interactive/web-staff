---
title: "NPM DNS prerequisites"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 139
audience: ["admin","ai"]
tags: ["dns-prerequisites"]
---

# NPM DNS prerequisites

## Purpose

A záznam příslušné domény směřuje na 51.254.46.124. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. A záznam příslušné domény směřuje na 51.254.46.124
2. Nezakládej nefunkční AAAA
3. Před certifikátem ověř DNS zvenčí

~~~bash
dig +short panel.diamondcrew.net A
~~~



## Verification

Resolver vrací správný cíl a porty 80/443 vedou do NPM.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
