---
title: "Ověřené stažení panelu"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 7
audience: ["admin","ai"]
tags: ["download"]
---

# Ověřené stažení panelu

## K čemu slouží

Cílová baseline je Pterodactyl v1.15.1.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Cílová baseline je Pterodactyl v1.15.1
2. Přes GitHub release API vyber panel.tar.gz z přesného tagu
3. Ověř dostupný release digest nebo schválený SHA256 a prohlédni obsah taru
4. Nerozbaluj neověřený archiv přes živou instalaci

~~~bash
curl -fsSL https://api.github.com/repos/pterodactyl/panel/releases/tags/v1.15.1 | jq -r ' .assets[] | [.name, .browser_download_url, .digest] | @tsv'
~~~

## Ověření výsledku

Archiv odpovídá tagu; aplikace po instalaci hlásí 1.15.1.

## Související návody

[Kategorie a navazující návody](index.md)
