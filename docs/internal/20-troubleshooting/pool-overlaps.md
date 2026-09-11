---
title: "Překryv rozsahů: Pool overlaps"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 222
audience: ["admin","ai"]
tags: ["pool-overlaps","troubleshooting","diagnostics"]
---

# Překryv rozsahů: Pool overlaps

## Příznaky
Docker refuses the requested network pool.

## Pravděpodobné příčiny
Requested subnet overlaps an existing Docker/VPN/host network.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
docker network inspect $(docker network ls -q) --format '{{.Name}} -> {{range .IPAM.Config}}{{.Subnet}}{{end}}'
~~~

## Oprava
Skutečný DIA-01 má bridge172.17, NPM172.18, pterodactyl0172.19. Na novém hostu inspectuj vlastní mapu. Zálohuj config, zastav dotčené hry, zvol volný subnet a odstraň/recreate jen potvrzenou prázdnou dotčenou síť. Nikdy blanket network prune.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
Žádná kolize a hry projdou network test. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
IPAM inventář a nepřenášet 172.19 slepě. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
