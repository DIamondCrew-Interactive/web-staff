---
title: "Disk full"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 231
audience: ["admin","ai"]
tags: ["disk-full","troubleshooting","diagnostics"]
---

# Disk full

## Symptoms
Install, DB writes or logs fail.

## Likely Causes
Volumes/logs growth, exhausted filesystem/inodes.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
df -h
df -i
docker system df
~~~

## Fix
Urči skutečného vlastníka dat. Uvolňuj jen potvrzené nepotřebné logy/artefakty dle retence; nemaž game volumes ani blanket prune --volumes.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
DB a hra mohou bezpečně zapisovat. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Capacity alerts a log rotation. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
