---
title: "Záloha panelu"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 25
audience: ["admin","ai"]
tags: ["backup"]
---

# Záloha panelu

## K čemu slouží

Naplánuj konzistentní zálohu panel DB.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Naplánuj konzistentní zálohu panel DB
2. Ulož konfiguraci a její secrets odděleně šifrovaně
3. Zachovej verzi aplikace a branding manifest
4. Otestuj obnovu izolovaně

## Ověření výsledku

Záloha má čitelný manifest, checksum a zaznamenaný restore test.

## Související návody

[Kategorie a navazující návody](index.md)
