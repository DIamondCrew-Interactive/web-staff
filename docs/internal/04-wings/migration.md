---
title: "Migrace Wings nodu"
category: 04-wings
categoryTitle: "Wings"
order: 40
audience: ["admin","ai"]
tags: ["migration"]
---

# Migrace Wings nodu

## K čemu slouží

Rozhodni náhrada identity vs nový node.

## Kde a jak běží

Wings 1.13.3 na DIA-01: HTTP 0.0.0.0:8443 za NPM TLS, SFTP 2022, data /var/lib/pterodactyl/volumes.

## Postup

1. Rozhodni náhrada identity vs nový node
2. Zastav migrované hry
3. Přenes konzistentní volumes a chráněnou konfiguraci
4. Obnov allocations/firewall a přepni až po testu

## Ověření výsledku

Na původním nodu neběží druhá zapisující kopie.

## Související návody

[Kategorie a navazující návody](index.md)
