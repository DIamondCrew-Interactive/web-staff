---
title: "Ověření dokončené obnovy"
category: 21-disaster-recovery
categoryTitle: "Obnova po havárii"
order: 214
audience: ["admin","ai"]
tags: ["final-checklist"]
---

# Ověření dokončené obnovy

## K čemu slouží

Potvrď OS/SSH, Docker, DB/Redis/PHP, Panel/worker/scheduler.

## Kde a jak běží

DIA-01 LOST: čistý host, konzistentní offsite zálohy, ověřené verze a řízené přepnutí DNS.

## Postup

1. Potvrď OS/SSH, Docker, DB/Redis/PHP, Panel/worker/scheduler
2. Wings a všechny games
3. txAdmin, NPM/TLS, Staff/Status
4. Auth/AI hranice
5. Nová záloha a monitoring

## Ověření výsledku

Provozní vlastník přijme obnovu a zaznamená skutečný RPO/RTO.

## Související návody

[Kategorie a navazující návody](index.md)
