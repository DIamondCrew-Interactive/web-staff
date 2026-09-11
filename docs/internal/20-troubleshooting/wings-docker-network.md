---
title: "Wings cannot create game network"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 221
audience: ["admin","ai"]
tags: ["wings-docker-network","troubleshooting","diagnostics"]
---

# Wings cannot create game network

## Symptoms
Daemon reports Docker network failure.

## Likely Causes
Subnet overlap, stale endpoints, mismatched config.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
docker network ls
docker network inspect pterodactyl0
~~~

## Fix
Zmapuj IPAM a endpoints. Vyber volný subnet a v údržbě oprav jen dotčenou síť/config.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Nový DEV container má inbound/outbound síť. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Inspect před vytvořením každého nodu. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
