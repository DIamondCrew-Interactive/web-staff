---
title: "Problém s překladem DNS"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 229
audience: ["admin","ai"]
tags: ["dns","troubleshooting","diagnostics"]
---

# Problém s překladem DNS

## Příznaky
NXDOMAIN or request reaches wrong host.

## Pravděpodobné příčiny
Missing/wrong record, cached TTL, stale AAAA.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
dig +short staff.diamondcrew.net A
dig +short staff.diamondcrew.net AAAA
~~~

## Oprava
Oprav authoritative record a respektuj TTL. Nezapomeň na IPv6, pokud je zveřejněné.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
Správná adresa na více resolvers. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
DNS inventář. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
