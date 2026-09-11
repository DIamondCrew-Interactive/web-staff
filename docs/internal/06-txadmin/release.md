---
title: "Výběr verze monitoru"
category: 06-txadmin
categoryTitle: "txAdmin"
order: 130
audience: ["admin","ai"]
tags: ["release"]
---

# Výběr verze monitoru

## K čemu slouží

Použij release metadata DIamondCrew-Interactive/fivem-txadmindc.

## Kde a jak běží

DiamondCrew monitor nad FXServer artifactem; NPM publikuje konzoli odděleně od hry.

## Postup

1. Použij release metadata DIamondCrew-Interactive/fivem-txadmindc
2. Zapiš konkrétní tag, monitor.zip a checksum/digest
3. Latest nehardcoduj jako nekonečně kompatibilní verzi

~~~bash
curl -fsSL https://api.github.com/repos/DIamondCrew-Interactive/fivem-txadmindc/releases/latest | jq -r ' .tag_name, (.assets[] | [.name,.browser_download_url,.digest] | @tsv)'
~~~

## Ověření výsledku

Asset existuje a hash odpovídá schválenému releasu.

## Související návody

[Kategorie a navazující návody](index.md)
