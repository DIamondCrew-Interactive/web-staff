---
title: "Plný disk"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 231
audience: ["admin","ai"]
tags: ["disk-full","troubleshooting","diagnostics"]
---

# Plný disk

## Příznaky
Install, DB writes or logs fail.

## Pravděpodobné příčiny
Volumes/logs growth, exhausted filesystem/inodes.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
df -h
df -i
docker system df
~~~

## Oprava
Urči skutečného vlastníka dat. Uvolňuj jen potvrzené nepotřebné logy/artefakty dle retence; nemaž game volumes ani blanket prune --volumes.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
DB a hra mohou bezpečně zapisovat. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Capacity alerts a log rotation. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
