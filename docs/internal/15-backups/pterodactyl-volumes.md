---
title: "Záloha Pterodactyl volumes"
category: 15-backups
categoryTitle: "Zálohování a obnova"
order: 200
audience: ["admin","ai"]
tags: ["pterodactyl-volumes"]
---

# Záloha Pterodactyl volumes

## K čemu slouží

Data jsou /var/lib/pterodactyl/volumes.

## Kde a jak běží

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Postup

1. Data jsou /var/lib/pterodactyl/volumes
2. Zastav nebo konzistentně snapshotuj zapisující hry
3. Zachovej UUID mapu serverů a metadata
4. DB mimo volumes zálohuj zvlášť

## Ověření výsledku

Testovací server načte svět/resources a data odpovídají času zálohy.

## Související návody

[Kategorie a navazující návody](index.md)
