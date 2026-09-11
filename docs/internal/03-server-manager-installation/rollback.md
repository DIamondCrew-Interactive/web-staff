---
title: "Rollback panelu"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 26
audience: ["admin","ai"]
tags: ["rollback"]
---

# Rollback panelu

## K čemu slouží

Zastav nové zápisy.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Zastav nové zápisy
2. Vyber poslední kompatibilní app/DB/config sadu
3. Obnov ji do testovacího cíle a ověř
4. Teprve poté vrať produkční směrování

## Ověření výsledku

Šifrovaná data jsou čitelná původním klíčem a workery používají správné schema.

## Související návody

[Kategorie a navazující návody](index.md)
