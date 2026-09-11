---
title: "Docker service DNS failure"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 230
audience: ["admin","ai"]
tags: ["docker-network","troubleshooting","diagnostics"]
---

# Docker service DNS failure

## Symptoms
NPM cannot resolve application service.

## Likely Causes
Not on same user-defined network or wrong service name.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
docker network inspect diamondcrew-proxy
~~~

## Fix
Oprav networks v Compose obou služeb a recreate dotčený container. Nevkládej náhodnou dočasnou container IP do trvalé konfigurace.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Service DNS přežije recreate. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
External network deklarovaná v obou projektech. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
