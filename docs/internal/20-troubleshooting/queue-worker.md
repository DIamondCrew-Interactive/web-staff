---
title: "Queue tasks do not complete"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 219
audience: ["admin","ai"]
tags: ["queue-worker","troubleshooting","diagnostics"]
---

# Queue tasks do not complete

## Symptoms
Pending emails or background operations.

## Likely Causes
pteroq stopped, Redis unavailable, wrong code generation.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl status pteroq redis-server --no-pager
redis-cli ping
~~~

## Fix
Oprav Redis/systémovou službu, potom po správném deploymentu restartuj queue. Neopakuj již provedené operace bez kontroly idempotence.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Testovací queued task dokončen právě jednou. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Monitoring pteroq a deploy queue restart. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
