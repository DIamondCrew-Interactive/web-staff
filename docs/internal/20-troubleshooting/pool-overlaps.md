---
title: "Pool overlaps with other one on this address space"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 222
audience: ["admin","ai"]
tags: ["pool-overlaps","troubleshooting","diagnostics"]
---

# Pool overlaps with other one on this address space

## Symptoms
Docker refuses the requested network pool.

## Likely Causes
Requested subnet overlaps an existing Docker/VPN/host network.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
docker network inspect $(docker network ls -q) --format '{{.Name}} -> {{range .IPAM.Config}}{{.Subnet}}{{end}}'
~~~

## Fix
Skutečný DIA-01 má bridge172.17, NPM172.18, pterodactyl0172.19. Na novém hostu inspectuj vlastní mapu. Zálohuj config, zastav dotčené hry, zvol volný subnet a odstraň/recreate jen potvrzenou prázdnou dotčenou síť. Nikdy blanket network prune.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Žádná kolize a hry projdou network test. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
IPAM inventář a nepřenášet 172.19 slepě. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
