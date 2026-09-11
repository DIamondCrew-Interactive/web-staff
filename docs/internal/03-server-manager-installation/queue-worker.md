---
title: "pteroq queue worker"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 13
audience: ["admin","ai"]
tags: ["queue-worker"]
---

# pteroq queue worker

## K čemu slouží

Vytvoř pteroq.service podle Fresh install.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Vytvoř pteroq.service podle Fresh install
2. Worker běží jako www-data a závisí na Redis
3. Aktivuj službu
4. Po změně release restartuj workery

~~~bash
sudo systemctl daemon-reload
sudo systemctl enable --now pteroq
cd /var/www/pterodactyl
php artisan queue:restart
systemctl status pteroq --no-pager
~~~

## Ověření výsledku

Služba je active a testovaná queued akce se dokončí.

## Související návody

[Kategorie a navazující návody](index.md)
