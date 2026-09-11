---
title: "Update Staff Center"
category: 11-staff-center
categoryTitle: "Staff Center"
order: 183
audience: ["admin","ai"]
tags: ["update"]
---

# Update Staff Center

## Purpose

Uchovej předchozí commit, env a image. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Veřejný rozcestník; Discord povoluje Cookbook UI. Express na 3000 za NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Uchovej předchozí commit, env a image
2. Až po schváleném pushi fetchni a checkoutni konkrétní commit
3. Doplň env
4. Build a recreate
5. Ověř public/auth/AI hranice

~~~bash
cd /opt/diamondcrew-staffcenter
git fetch origin --tags
# git checkout <approved-commit>
docker compose build
docker compose up -d
docker compose ps
~~~



## Verification

Status a login fungují; nic v deploymentu nespouští vzdálené příkazy z dokumentace.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
