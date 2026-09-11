---
title: "Výběr verze vzhledu"
category: 03-server-manager-installation
categoryTitle: "Instalace Server Manageru"
order: 23
audience: ["admin","ai"]
tags: ["reskin-release"]
---

# Výběr verze vzhledu

## K čemu slouží

Na GitHubu zkontroluj přesný release a jeho assets.

## Kde a jak běží

DiamondCrew Server Manager: Pterodactyl 1.15.1 v /var/www/pterodactyl; PHP 8.3, MariaDB panel, lokální Redis, pteroq.service.

## Postup

1. Na GitHubu zkontroluj přesný release a jeho assets
2. Vyber diamondcrew-server-manager-1.15.1.tar.gz a checksum
3. Nezaměň zdrojový archive s hotovým build assetem
4. Release publikace sama nenasazuje

~~~bash
curl -fsSL https://api.github.com/repos/DIamondCrew-Interactive/web-servermanager/releases/latest | jq -r ' .tag_name, (.assets[] | .name)'
~~~

## Ověření výsledku

Checksum sedí a cílová baseline odpovídá.

## Související návody

[Kategorie a navazující návody](index.md)
