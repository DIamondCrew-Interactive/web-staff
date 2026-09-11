---
title: "Diagnostika Image Service"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 403
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Diagnostika Image Service

## Cíl
Diagnostika Image Service.

## Potřebné údaje
Cílová doména, schválený rozsah, konkrétní soubory, aktuální dostupnost a neveřejně ověřené přístupy. <cdn-server-ip> a <cdn-web-root> nejsou známé hodnoty.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Complete procedure](../22-image-service-cdn/troubleshooting.md), [Zabezpečení](../22-image-service-cdn/security.md).

## Kontrola a záloha před změnou
Read-only inventory. Před bulk změnou vždy backup + inventory, před overwrite nebo delete explicitní souhlas nad konkrétními soubory.

## Postup
Rozliš public GET, OAuth, inventory a write. Nejprve health, přesná URL, status/MIME, logy bez secrets. Nevypínej auth a nepoužívej chmod777. Nesoulad storage identity nebo checksumů eskaluj.

## Ověření výsledku
Ověř očekávaný stav path/public URL, auth hranice a skutečný obraz, ne jen exit code.

## Rollback
Připrav konkrétní původní data/config/DNS; nedestruktivní návrat podle odkazovaného runbooku.

## Kdy zastavit postup
Neznámý storage root/IP, chybějící souhlas k overwrite/delete, symlink, neshoda checksumů nebo chybějící restore plán.

## Kdy předat problém správci
Zásah mění veřejné DNS, velký objem dat nebo vyžaduje neznámé credentials. Secrets neposílej do Cookbooku ani výstupu.
