---
title: "Panel returns 500"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 216
audience: ["admin","ai"]
tags: ["panel-500","troubleshooting","diagnostics"]
---

# Panel returns 500

## Symptoms
Laravel/PHP error after config or schema change.

## Likely Causes
DB connectivity, missing dependencies, wrong permissions or stale config.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl status php8.3-fpm mariadb redis-server --no-pager
~~~

## Fix
Zkontroluj redigovaný Laravel error pro konkrétní čas. Oprav nalezenou DB/env/permission příčinu a invaliduj cache podle release postupu; negeneruj nový APP_KEY.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Login, DB request a queue task. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Otestovaný update a konzistentní app/DB/config backup. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
