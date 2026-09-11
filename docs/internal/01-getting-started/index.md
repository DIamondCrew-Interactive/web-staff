---
title: "Začínáme"
category: 01-getting-started
categoryTitle: "Začínáme"
order: 0
audience: ["admin","ai"]
tags: ["index","01-getting-started"]
---

# Začínáme

## K čemu slouží
Inventář, architektura a pravidla DiamondCrew.

## Před změnou serveru

1. Ověř cílový stroj, službu, verzi a oprávnění svého účtu.
2. Ulož původní konfiguraci a ověř zálohu dat. U změny provozu domluv údržbu s vlastníkem.
3. Po změně proveď kontrolu uvedenou v návodu. Pokud selže, zastav další zápisy a vrať kompatibilní konfiguraci a data.

> Po databázové migraci nemusí stačit rollback aplikace. Obnov kompatibilní verzi aplikace i databáze. Obnovu přes živá data nejprve potvrď s vlastníkem serveru.

## Když něco nefunguje

Rozliš chybu konfigurace, služby a sítě. Správci předej název služby, čas a konkrétní chybu; z výpisů odstraň hesla, tokeny, cookies a osobní údaje. Destruktivní operaci neopakuj naslepo.

## Návody v této kategorii
- [Přehled architektury](architecture.md)
- [Přehled služeb](service-map.md)
- [Přehled domén](domain-map.md)
- [Pravidla pro porty DiamondCrew](port-map.md)
- [Přehled Docker sítí](network-map.md)
- [GitHub repozitáře a verze](repositories.md)
- [Zdroje a ověřování verzí](sources.md)
- [DiamondCrew Cookbook — vstup pro AI](ai-entrypoint.md)

## Rozsah a zabezpečení
Dokumentace je přístupná i unlisted AI API. Neobsahuje skutečné credentials. DiamondCrew porty a adresy jsou konvence a inventář dodaný provozovatelem, ne obecné požadavky softwaru ani živé metriky.

## Související návody
[Architecture](architecture.md)

## Image Service / CDN
[Image Service / CDN](../22-image-service-cdn/index.md) — veřejné asset URL, management a migrace existujícího CDN.
