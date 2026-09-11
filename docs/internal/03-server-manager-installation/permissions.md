---
title: "Oprávnění souborů panelu"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 12
audience: ["admin","ai"]
tags: ["permissions"]
---

# Oprávnění souborů panelu

## K čemu slouží

PHP worker www-data musí číst aplikaci a zapisovat storage/bootstrap/cache.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. PHP worker www-data musí číst aplikaci a zapisovat storage/bootstrap/cache
2. Provozní .env není veřejný asset
3. Nepoužívej chmod 777 a nepřiděluj práva všem uživatelům

~~~bash
cd /var/www/pterodactyl
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R u+rwX,g+rX,o-rwx storage bootstrap/cache
sudo chown root:www-data .env
sudo chmod 640 .env
~~~

## Ověření výsledku

Login a cache fungují bez permission denied; .env přes HTTP vrací 404/403.

## Související návody

[Kategorie a navazující návody](index.md)
