---
title: "Server exits 127"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 224
audience: ["admin","ai"]
tags: ["server-exit-127","troubleshooting","diagnostics"]
---

# Server exits 127

## Symptoms
Process cannot execute startup command.

## Likely Causes
Missing executable, interpreter, library loader or wrong path.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
docker ps -a
~~~

## Fix
Zkontroluj actual startup a Files. Existence binárky sama nestačí, může chybět interpreter/loader. Vyber kompatibilní runtime a oprav cestu.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Proces startuje bez path/library chyby. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Startup smoke test pro novou i starou instanci. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
