---
title: "nginx server block"
category: 08-web-hosting
categoryTitle: "Web hosting"
order: 159
audience: ["admin","ai"]
tags: ["nginx-server-block"]
---

# nginx server block

## Purpose

Použij server_name odpovídající doméně a správný root. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Použij server_name odpovídající doméně a správný root
2. Zvol volný interní port po ss -ltnp
3. Validuj nginx -t před reload

~~~bash
sudo nginx -t
sudo systemctl reload nginx
~~~



## Verification

Lokální request s Host najde správný vhost.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
