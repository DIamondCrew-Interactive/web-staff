---
title: "Obnova celého stacku"
category: 15-backups
categoryTitle: "Zálohování a obnova"
order: 206
audience: ["admin","ai"]
tags: ["full-restore"]
---

# Obnova celého stacku

## K čemu slouží

Postupuj Disaster recovery DIA-01 LOST.

## Kde a jak běží

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Postup

1. Postupuj Disaster recovery DIA-01 LOST
2. Nejdřív host/závislosti, pak DB/aplikace, Wings/data, NPM a weby
3. Až po testu DNS

## Ověření výsledku

Hry, txAdmin a veřejné služby jsou ověřené před ukončením incidentu.

## Související návody

[Kategorie a navazující návody](index.md)
