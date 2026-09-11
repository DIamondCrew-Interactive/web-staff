---
title: "Instalace MariaDB"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 4
audience: ["admin","ai"]
tags: ["mariadb"]
---

# Instalace MariaDB

## K čemu slouží

Nainstaluj mariadb-server distribučním správcem.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Nainstaluj mariadb-server distribučním správcem
2. Aktivuj službu a omez listener dle skutečného DB modelu
3. Lokální Panel nepotřebuje veřejný port databáze

~~~bash
sudo apt-get install mariadb-server
sudo systemctl enable --now mariadb
sudo mariadb-admin ping
~~~

## Ověření výsledku

mariadb-admin ping vrací živý server.

## Související návody

[Kategorie a navazující návody](index.md)
