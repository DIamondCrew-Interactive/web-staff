---
title: "Správa portů (Allocations)"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 20
audience: ["admin","ai"]
tags: ["allocations"]
---

# Správa portů (Allocations)

## K čemu slouží

Admin.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Admin
2. Nodes
3. DIA-01
4. Allocations
5. Zkontroluj existující porty a firewall
6. Přidej pouze volný port nebo rozsah a přiřaď ho serveru

~~~bash
ss -ltnp
ss -lunp
~~~

## Ověření výsledku

Port nemá jiného vlastníka a je dosažitelný správným protokolem.

## Související návody

[Kategorie a navazující návody](index.md)
