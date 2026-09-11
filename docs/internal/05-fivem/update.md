---
title: "Aktualizace FiveM artifactu"
category: 05-fivem
categoryTitle: "FiveM"
order: 127
audience: ["admin","ai"]
tags: ["update"]
---

# Aktualizace FiveM artifactu

## K čemu slouží

Zálohuj artifact, monitor, txData, server-data i DB.

## Kde a jak běží

Oddělené PROD/DEV instance; herní allocations a TXHOST konfigurace.

## Postup

1. Zálohuj artifact, monitor, txData, server-data i DB
2. Na DEV ověř nový artifact a startup
3. Vyměň monitor jen po kontrole checksumu
4. Až poté proveď PROD změnu

## Ověření výsledku

Install/start/stop/restart a player endpoint jsou ověřené.

## Související návody

[Kategorie a navazující návody](index.md)
