---
title: "Aktualizace a rollback Docker image"
category: 14-docker
categoryTitle: "Docker a sítě"
order: 196
audience: ["admin","ai"]
tags: ["update-rollback"]
---

# Aktualizace a rollback Docker image

## K čemu slouží

Před build označ běžící image rollback tagem.

## Kde a jak běží

Docker host, bridge sítě, pterodactyl0 a external diamondcrew-proxy mají různé úlohy.

## Postup

1. Před build označ běžící image rollback tagem
2. Nový build otestuj
3. Při regresi vrať image spolu s kompatibilní Compose/env konfigurací

## Ověření výsledku

Starý image není přepsaný ani automaticky odstraněný před akceptací.

## Související návody

[Kategorie a navazující návody](index.md)
