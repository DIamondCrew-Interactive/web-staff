---
title: "Incidenty a údržba"
category: 12-public-status
categoryTitle: "Veřejný status"
order: 187
audience: ["admin","ai"]
tags: ["incidents"]
---

# Incidenty a údržba

## K čemu slouží

Veřejné env oznámení má popsat dopad bez secrets.

## Kde a jak běží

Samostatný veřejný proces public-status:3000; žádné admin dlaždice ani Cookbook routy.

## Postup

1. Veřejné env oznámení má popsat dopad bez secrets
2. Globální nebo target maintenance označí údržbu
3. Po ukončení vrať flag a ověř skutečné probes

## Ověření výsledku

Banner odpovídá reálnému incidentu; nezveřejňuje interní IP.

## Související návody

[Kategorie a navazující návody](index.md)
