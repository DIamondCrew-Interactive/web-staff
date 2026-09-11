---
title: "Staff Center login/status trouble"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 234
audience: ["admin","ai"]
tags: ["staff-center","troubleshooting","diagnostics"]
---

# Staff Center login/status trouble

## Symptoms
Public works but login or Cookbook does not.

## Likely Causes
OAuth callback mismatch, missing allowlist, expired session, invalid docs metadata.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
docker compose ps
docker compose logs --tail=50 staffcenter
~~~

## Fix
Ověř callback přesně, env nastavení bezpečně a allowlist ID. No internal access není chyba veřejného webu. Docs503 vyžaduje check:docs, ne obejití autorizace.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Anonymous200, protected401, allowed docs200, AI200. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Auth security tests a docs validation před build. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
