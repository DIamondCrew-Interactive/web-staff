---
title: "MariaDB neběží"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 232
audience: ["admin","ai"]
tags: ["database-down","troubleshooting","diagnostics"]
---

# MariaDB neběží

## Příznaky
Panel/game DB requests fail.

## Pravděpodobné příčiny
Service failure, disk, corrupted state, bad config.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl status mariadb --no-pager
df -h
~~~

## Oprava
Nejdřív řeš disk/config/log příčinu. Před recovery dat zachovej kopii a použij ověřený restore, ne náhodné mazání DB souborů.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
mariadb-admin ping a aplikace. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Restore drills a capacity monitoring. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
