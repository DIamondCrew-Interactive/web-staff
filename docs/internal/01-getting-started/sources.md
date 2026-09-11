---
title: "Source accuracy and version policy"
category: 01-getting-started
categoryTitle: "Getting started"
order: 119
audience: ["admin","ai"]
tags: ["sources"]
---

# Source accuracy and version policy

## Purpose

Inventář v master specifikaci dodal provozovatel. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Inventář, architektura a pravidla DiamondCrew.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Inventář v master specifikaci dodal provozovatel
2. Obecné postupy ověřuj v oficiálních návodech
3. GitHub release API dne 2026-09-11 potvrdilo Panel v1.15.1 a Wings v1.13.3
4. Před pozdější instalací znovu ověř kompatibilitu

Primary sources: https://pterodactyl.io/panel/1.0/getting_started.html · https://pterodactyl.io/wings/1.0/installing.html · https://docs.docker.com/engine/install/debian/ · https://nginxproxymanager.com/setup/ · https://docs.discord.com/developers/topics/oauth2 · https://packages.sury.org/php/README.txt · https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/install-redis-on-linux/ · https://mariadb.com/docs/server/server-management/backup-and-restore/mariadb-dump . Dokumentace může používat obecnou řadu 1.x; release metadata a lokální baseline mají přednost před titulkem cached docs.

## Verification

Neznámé hodnoty jsou `<configure-for-target-environment>`, nikdy vymyšlené App ID nebo image tag.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
