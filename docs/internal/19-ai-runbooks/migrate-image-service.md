---
title: "Migrate Image Service"
category: 19-ai-runbooks
categoryTitle: "AI runbooks"
order: 402
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Migrate Image Service

## GOAL
Migrate Image Service.

## REQUIRED CONTEXT
Cílová doména, schválený rozsah, konkrétní soubory, aktuální dostupnost a neveřejně ověřené přístupy. <cdn-server-ip> a <cdn-web-root> nejsou známé hodnoty.

## READ FIRST
[Complete procedure](../22-image-service-cdn/migration.md), [Security](../22-image-service-cdn/security.md).

## PRE-CHECKS AND BACKUP
Read-only inventory. Před bulk změnou vždy backup + inventory, před overwrite nebo delete explicitní souhlas nad konkrétními soubory.

## PROCEDURE
Vyžádej ověřené current/new VPS a media root; nehádej IP. Inventory, backup, checksums, staging, audit, copy, permissions, sample URLs, health/TLS a teprve schválený DNS switch. Starý backend ponech pro rollback.

## VERIFICATION
Ověř očekávaný stav path/public URL, auth hranice a skutečný obraz, ne jen exit code.

## ROLLBACK
Připrav konkrétní původní data/config/DNS; nedestruktivní návrat podle odkazovaného runbooku.

## STOP CONDITIONS
Neznámý storage root/IP, chybějící souhlas k overwrite/delete, symlink, neshoda checksumů nebo chybějící restore plán.

## ESCALATE WHEN
Zásah mění veřejné DNS, velký objem dat nebo vyžaduje neznámé credentials. Secrets neposílej do Cookbooku ani výstupu.
