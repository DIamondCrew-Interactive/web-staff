---
title: "Game installation failed"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 223
audience: ["admin","ai"]
tags: ["server-install-failed","troubleshooting","diagnostics"]
---

# Game installation failed

## Symptoms
Install log ends unsuccessfully.

## Likely Causes
Download failure, wrong asset, missing runtime, permissions or disk.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
df -h
docker ps -a
~~~

## Fix
Zkontroluj první instalační chybu, ověř URL/digest a disk. Oprav Egg na DEV. Reinstall PROD teprve po záloze a znalosti dopadu.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Čistý install/start/stop. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Versioned tested Egg. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
