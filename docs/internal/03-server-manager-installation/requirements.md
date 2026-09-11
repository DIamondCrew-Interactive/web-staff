---
title: "Požadavky na Debian a runtime"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 2
audience: ["admin","ai"]
tags: ["requirements"]
---

# Požadavky na Debian a runtime

## K čemu slouží

Použij Debian 12 a PHP 8.3 podle DiamondCrew baseline.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Použij Debian 12 a PHP 8.3 podle DiamondCrew baseline
2. Před instalací zkontroluj RAM, disk, architekturu a obsazené listenery
3. Nezaměň systémové předpoklady s herními limity

~~~bash
cat /etc/os-release
php -v
php -m
df -h
ss -ltnp
~~~

## Ověření výsledku

Verze PHP a extensions odpovídají požadavkům cílového release.

## Související návody

[Kategorie a navazující návody](index.md)
