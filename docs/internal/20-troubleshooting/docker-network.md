---
title: "Nefunkční DNS Docker služby"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 230
audience: ["admin","ai"]
tags: ["docker-network","troubleshooting","diagnostics"]
---

# Nefunkční DNS Docker služby

## Příznaky
NPM cannot resolve application service.

## Pravděpodobné příčiny
Not on same user-defined network or wrong service name.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
docker network inspect diamondcrew-proxy
~~~

## Oprava
Oprav networks v Compose obou služeb a recreate dotčený container. Nevkládej náhodnou dočasnou container IP do trvalé konfigurace.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
Service DNS přežije recreate. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
External network deklarovaná v obou projektech. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
