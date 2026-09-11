---
title: "Select custom monitor release"
category: 06-txadmin
categoryTitle: "txAdmin"
order: 130
audience: ["admin","ai"]
tags: ["release"]
---

# Select custom monitor release

## Purpose

Použij release metadata DIamondCrew-Interactive/fivem-txadmindc. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

DiamondCrew monitor nad FXServer artifactem; NPM publikuje konzoli odděleně od hry.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Použij release metadata DIamondCrew-Interactive/fivem-txadmindc
2. Zapiš konkrétní tag, monitor.zip a checksum/digest
3. Latest nehardcoduj jako nekonečně kompatibilní verzi

~~~bash
curl -fsSL https://api.github.com/repos/DIamondCrew-Interactive/fivem-txadmindc/releases/latest | jq -r ' .tag_name, (.assets[] | [.name,.browser_download_url,.digest] | @tsv)'
~~~



## Verification

Asset existuje a hash odpovídá schválenému releasu.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
