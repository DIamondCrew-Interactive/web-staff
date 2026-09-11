---
title: "Přehled architektury"
category: 01-getting-started
categoryTitle: "Začínáme"
order: 113
audience: ["admin","ai"]
tags: ["architecture"]
---

# Přehled architektury

## K čemu slouží

DIA-01 / dc-node01 běží na Debianu 12 a veřejné IP 51.254.46.124.

## Kde a jak běží

Inventář, architektura a pravidla DiamondCrew.

## Postup

1. DIA-01 / dc-node01 běží na Debianu 12 a veřejné IP 51.254.46.124
2. NPM ukončuje HTTPS
3. Lokální nginx/PHP obsluhuje Panel, Wings řídí game kontejnery
4. Staff a Status jsou samostatné kontejnery na diamondcrew-proxy

## Ověření výsledku

Veřejný webový request nezaměňuješ s herním TCP/UDP ani s SSH.

## Související návody

[Kategorie a navazující návody](index.md)
