---
title: "První administrátor"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 17
audience: ["admin","ai"]
tags: ["first-admin"]
---

# První administrátor

## K čemu slouží

Na nové instalaci spusť p:user:make.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Na nové instalaci spusť p:user:make
2. Odpověz na interaktivní dotazy pro správce
3. Heslo zadávej pouze v neveřejné relaci
4. Přihlas se a nastav dostupné bezpečnostní volby

~~~bash
cd /var/www/pterodactyl
php artisan p:user:make
~~~

## Ověření výsledku

Účet otevře administraci; nepoužívej ho pro běžné delegované hraní.

## Související návody

[Kategorie a navazující návody](index.md)
