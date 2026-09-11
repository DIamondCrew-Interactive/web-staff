---
title: "Databáze panelu"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 6
audience: ["admin","ai"]
tags: ["database"]
---

# Databáze panelu

## K čemu slouží

Vytvoř samostatnou databázi panel a aplikačního uživatele.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Vytvoř samostatnou databázi panel a aplikačního uživatele
2. Oprávnění omez na panel.* a skutečný source host
3. DB heslo vlož jen do interaktivního konfigurátoru a chráněného env

~~~bash
sudo mariadb
~~~

SQL šablona ve Fresh install používá placeholder, který před provedením nahraď bezpečně.

## Ověření výsledku

Panel provede DB spojení a migrations; nevypisuj heslo.

## Související návody

[Kategorie a navazující návody](index.md)
