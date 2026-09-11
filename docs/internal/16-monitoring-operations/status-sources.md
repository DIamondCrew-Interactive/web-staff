---
title: "Význam stavů služeb"
category: 16-monitoring-operations
categoryTitle: "Monitoring a provoz"
order: 207
audience: ["admin","ai"]
tags: ["status-sources"]
---

# Význam stavů služeb

## K čemu slouží

ONLINE je potvrzení nakonfigurovaného zdroje.

## Kde a jak běží

Pouze měřené stavy; UNKNOWN není OFFLINE. Provozní změny mají backup a ověření.

## Postup

1. ONLINE je potvrzení nakonfigurovaného zdroje
2. OFFLINE je známý stav procesu nebo neúspěšný HTTP probe
3. DEGRADED je přechodový/problémový stav
4. UNKNOWN je chybějící/nečitelný zdroj

## Ověření výsledku

Frontend nezaměňuje chybu API oprávnění za vypnutou hru.

## Související návody

[Kategorie a navazující návody](index.md)
