---
title: "MariaDB down"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 232
audience: ["admin","ai"]
tags: ["database-down","troubleshooting","diagnostics"]
---

# MariaDB down

## Symptoms
Panel/game DB requests fail.

## Likely Causes
Service failure, disk, corrupted state, bad config.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl status mariadb --no-pager
df -h
~~~

## Fix
Nejdřív řeš disk/config/log příčinu. Před recovery dat zachovej kopii a použij ověřený restore, ne náhodné mazání DB souborů.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
mariadb-admin ping a aplikace. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Restore drills a capacity monitoring. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
