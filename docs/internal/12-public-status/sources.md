---
title: "Zdroje skutečných stavů"
category: 12-public-status
categoryTitle: "Veřejný status"
order: 186
audience: ["admin","ai"]
tags: ["sources"]
---

# Zdroje skutečných stavů

## K čemu slouží

Pterodactyl vrací stav procesu.

## Kde a jak běží

Samostatný veřejný proces public-status:3000; žádné admin dlaždice ani Cookbook routy.

## Postup

1. Pterodactyl vrací stav procesu
2. FiveM vrací počet dostupných hráčů
3. HTTP healthcheck ověřuje reprezentativní endpoint
4. Chybějící zdroj znamená UNKNOWN

## Ověření výsledku

Neexistují demo counts, historie nebo vymyšlený uptime.

## Související návody

[Kategorie a navazující návody](index.md)

## Sdílený status od verze 1.3
Staff a Public Status používají stejné STATUS_TARGETS a server-only STATUS_WEB_TARGETS. Bez zdroje je UNKNOWN; nedostupný explicitní web healthprobe je OFFLINE; explicitní údržba MAINTENANCE. HTTP200 z webového rootu není důkaz herního procesu ani host health. DIA-01 musí mít vlastní healthUrl a nezdědí stav jiné služby.

Produkční herní STATUS_TARGETS je nyní prázdné a Pterodactyl API key není nastavený. Zobrazení herních serverů tedy zůstává UNKNOWN bez vymyšlených player counts. Mapování na skutečný resources endpoint doplň teprve po inventuře. Web targets lze nastavit pro ověřené veřejné domény; URLs a credentials se neposílají frontendům. Public varianta odfiltruje Controller/Proxy/DEV web rows i DEV game rows. Veřejné incident texty nesmějí obsahovat interní detaily.
