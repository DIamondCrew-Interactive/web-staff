---
title: "Diagnose Image Service"
category: 19-ai-runbooks
categoryTitle: "AI runbooks"
order: 403
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Diagnose Image Service

## GOAL
Diagnose Image Service.

## REQUIRED CONTEXT
Cílová doména, schválený rozsah, konkrétní soubory, aktuální dostupnost a neveřejně ověřené přístupy. <cdn-server-ip> a <cdn-web-root> nejsou známé hodnoty.

## READ FIRST
[Complete procedure](../22-image-service-cdn/troubleshooting.md), [Security](../22-image-service-cdn/security.md).

## PRE-CHECKS AND BACKUP
Read-only inventory. Před bulk změnou vždy backup + inventory, před overwrite nebo delete explicitní souhlas nad konkrétními soubory.

## PROCEDURE
Rozliš public GET, OAuth, inventory a write. Nejprve health, přesná URL, status/MIME, logy bez secrets. Nevypínej auth a nepoužívej chmod777. Nesoulad storage identity nebo checksumů eskaluj.

## VERIFICATION
Ověř očekávaný stav path/public URL, auth hranice a skutečný obraz, ne jen exit code.

## ROLLBACK
Připrav konkrétní původní data/config/DNS; nedestruktivní návrat podle odkazovaného runbooku.

## STOP CONDITIONS
Neznámý storage root/IP, chybějící souhlas k overwrite/delete, symlink, neshoda checksumů nebo chybějící restore plán.

## ESCALATE WHEN
Zásah mění veřejné DNS, velký objem dat nebo vyžaduje neznámé credentials. Secrets neposílej do Cookbooku ani výstupu.
