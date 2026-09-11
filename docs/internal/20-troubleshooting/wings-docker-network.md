---
title: "Wings nemůže vytvořit herní síť"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 221
audience: ["admin","ai"]
tags: ["wings-docker-network","troubleshooting","diagnostics"]
---

# Wings nemůže vytvořit herní síť

## Příznaky
Daemon reports Docker network failure.

## Pravděpodobné příčiny
Subnet overlap, stale endpoints, mismatched config.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
docker network ls
docker network inspect pterodactyl0
~~~

## Oprava
Zmapuj IPAM a endpoints. Vyber volný subnet a v údržbě oprav jen dotčenou síť/config.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
Nový DEV container má inbound/outbound síť. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Inspect před vytvořením každého nodu. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
