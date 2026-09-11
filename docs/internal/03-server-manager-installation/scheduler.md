---
title: "Plánovač úloh panelu"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 14
audience: ["admin","ai"]
tags: ["scheduler"]
---

# Plánovač úloh panelu

## K čemu slouží

Vytvoř jednu cron definici pro artisan schedule:run každou minutu.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Vytvoř jednu cron definici pro artisan schedule:run každou minutu
2. Pohlídej absolutní cestu a uživatele s právy k aplikaci
3. Nevytvářej paralelní duplicitní cron

~~~bash
sudo crontab -u www-data -e
~~~

Cron řádek: * * * * * /usr/bin/php /var/www/pterodactyl/artisan schedule:run >> /dev/null 2>&1

## Ověření výsledku

Naplánovaná testovací úloha se spustí jednou ve správné časové zóně.

## Související návody

[Kategorie a navazující návody](index.md)
