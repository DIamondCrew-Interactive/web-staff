---
title: "Konfigurace Wings"
category: 04-wings
categoryTitle: "Wings"
order: 30
audience: ["admin","ai"]
tags: ["config-yml"]
---

# Konfigurace Wings

## K čemu slouží

Konfiguraci generuje Panel.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Konfiguraci generuje Panel
2. Ulož ji do /etc/pterodactyl/config.yml s omezenými právy
3. Pro DIA-01 potvrď HTTP 0.0.0.0:8443, správné TLS/proxy nastavení a data path
4. Nekopíruj identitu na nový node

~~~bash
sudo chmod 600 /etc/pterodactyl/config.yml
sudo systemctl restart wings
~~~

## Ověření výsledku

Wings startuje bez parse chyby a odpovídá Panelu.

## Související návody

[Kategorie a navazující návody](index.md)
