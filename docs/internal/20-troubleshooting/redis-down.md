---
title: "Redis unavailable"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 233
audience: ["admin","ai"]
tags: ["redis-down","troubleshooting","diagnostics"]
---

# Redis unavailable

## Symptoms
Queue/cache operations fail.

## Likely Causes
Stopped service, port/ACL/config or memory issue.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl status redis-server --no-pager
redis-cli ping
~~~

## Fix
Oprav dostupnost/ACL bez zveřejnění credentials. Nepoužívej FLUSHALL jako první diagnostický krok.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
PONG a dokončený queue task. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Monitoring Redis a memory. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
