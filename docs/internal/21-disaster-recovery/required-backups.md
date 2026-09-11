---
title: "Podklady pro obnovu mimo server"
category: 21-disaster-recovery
categoryTitle: "Obnova po havárii"
order: 213
audience: ["admin","ai"]
tags: ["required-backups"]
---

# Podklady pro obnovu mimo server

## K čemu slouží

Připrav DB dumps, volumes, verze aplikací a chráněné konfigurace.

## Kde a jak běží

DIA-01 LOST: čistý host, konzistentní offsite zálohy, ověřené verze a řízené přepnutí DNS.

## Postup

1. Připrav DB dumps, volumes, verze aplikací a chráněné konfigurace
2. Odděleně uchovej APP_KEY, DB credentials, Wings identitu, Discord secrets, license keys a cert keys
3. Klíč k backupu musí být dostupný i bez DIA-01

## Ověření výsledku

Žádná nezbytná část obnovy není pouze na ztraceném serveru.

## Související návody

[Kategorie a navazující návody](index.md)
