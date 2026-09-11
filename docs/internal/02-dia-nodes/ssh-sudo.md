---
title: "SSH and sudo"
category: 02-dia-nodes
categoryTitle: "DIA nodes"
order: 121
audience: ["admin","ai"]
tags: ["ssh-sudo"]
---

# SSH and sudo

## Purpose

Vytvoř osobní ne-root účet a sudo oprávnění. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Debian 12, dc-node01 / DIA-01 a nové game/control-plane nody.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Vytvoř osobní ne-root účet a sudo oprávnění
2. Přenes pouze veřejný SSH klíč
3. V druhé session ověř přístup před změnou SSH politiky
4. Privátní klíč patří pouze držiteli

~~~bash
sudo adduser dcops
sudo usermod -aG sudo dcops
sudo sshd -t
~~~



## Verification

Nový uživatel se přihlásí a sudo -v uspěje bez ztráty původní recovery cesty.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
