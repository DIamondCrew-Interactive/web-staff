---
title: "txAdmin 502"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 226
audience: ["admin","ai"]
tags: ["txadmin-502","troubleshooting","diagnostics"]
---

# txAdmin 502

## Symptoms
Game may work while console proxy fails.

## Likely Causes
Wrong txAdmin allocation, process/interface, NPM scheme.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
ss -ltnp
docker ps --format 'table {{.Names}}	{{.Ports}}'
~~~

## Fix
Prismatic DEV admin je33031, game30131. Ověř skutečné allocations, TXHOST_TXA_PORT/interface a přímý HTTP request před NPM.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Console login a websocket. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Oddělený game/admin port map. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
