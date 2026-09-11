---
title: "Install Cockpit"
category: 10-cockpit
categoryTitle: "Cockpit"
order: 177
audience: ["admin","ai"]
tags: ["install"]
---

# Install Cockpit

## Purpose

Na Debian 12 nainstaluj cockpit. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Host management mimo Panel: admin.diamondcrew.net, 9090, cockpit.socket.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Na Debian 12 nainstaluj cockpit
2. Aktivuj cockpit.socket
3. Omez admin přístup
4. Reverzní proxy nakonfiguruj podle Cockpit origins požadavků

~~~bash
sudo apt-get update
sudo apt-get install cockpit
sudo systemctl enable --now cockpit.socket
systemctl status cockpit.socket --no-pager
curl -kI https://127.0.0.1:9090
~~~



## Verification

Lokální HTTPS odpovídá a socket je active.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
