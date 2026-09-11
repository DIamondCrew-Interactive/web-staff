---
title: "Panel database connection error"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 218
audience: ["admin","ai"]
tags: ["panel-database","troubleshooting","diagnostics"]
---

# Panel database connection error

## Symptoms
Login or page fails with DB exception.

## Likely Causes
MariaDB down, credentials/grants mismatch, wrong DB host.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
sudo mariadb-admin ping
systemctl status mariadb --no-pager
~~~

## Fix
Ověř DB panel a aplikační účet bezpečně bez výpisu hesla. Oprav host/grants/config; nedávej wildcard root přístup jako workaround.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Aplikace provede DB operaci. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Least-privilege account a kontrolovaný env backup. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
