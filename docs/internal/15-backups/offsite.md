---
title: "Offsite retention"
category: 15-backups
categoryTitle: "Backups & restore"
order: 204
audience: ["admin","ai"]
tags: ["offsite"]
---

# Offsite retention

## Purpose

Záloha musí být mimo DIA-01. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Konzistentní data, konfigurace a oddělený šifrovaný secret backup mimo primární stroj.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Záloha musí být mimo DIA-01
2. Šifruj ji a odděl oprávnění od produkce
3. Retenci stanov podle schváleného RPO/RTO
4. Ověř, že klíč k záloze není jen na ztraceném hostu



## Verification

Simulovaný restore lze provést bez přístupu k původnímu DIA-01.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
