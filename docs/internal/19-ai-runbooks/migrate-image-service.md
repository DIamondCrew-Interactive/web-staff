---
title: "Migrace Image Service"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 402
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Migrace Image Service

## Cíl
Migrace Image Service.

## Potřebné údaje
Cílová doména, schválený rozsah, konkrétní soubory, aktuální dostupnost a neveřejně ověřené přístupy. <cdn-server-ip> a <cdn-web-root> nejsou známé hodnoty.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Complete procedure](../22-image-service-cdn/migration.md), [Zabezpečení](../22-image-service-cdn/security.md).

## Kontrola a záloha před změnou
Read-only inventory. Před bulk změnou vždy backup + inventory, před overwrite nebo delete explicitní souhlas nad konkrétními soubory.

## Postup
Vyžádej ověřené current/new VPS a media root; nehádej IP. Inventory, backup, checksums, staging, audit, copy, permissions, sample URLs, health/TLS a teprve schválený DNS switch. Starý backend ponech pro rollback.

## Ověření výsledku
Ověř očekávaný stav path/public URL, auth hranice a skutečný obraz, ne jen exit code.

## Rollback
Připrav konkrétní původní data/config/DNS; nedestruktivní návrat podle odkazovaného runbooku.

## Kdy zastavit postup
Neznámý storage root/IP, chybějící souhlas k overwrite/delete, symlink, neshoda checksumů nebo chybějící restore plán.

## Kdy předat problém správci
Zásah mění veřejné DNS, velký objem dat nebo vyžaduje neznámé credentials. Secrets neposílej do Cookbooku ani výstupu.
