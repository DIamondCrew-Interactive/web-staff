---
title: "Redis není dostupný"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 233
audience: ["admin","ai"]
tags: ["redis-down","troubleshooting","diagnostics"]
---

# Redis není dostupný

## Příznaky
Queue/cache operations fail.

## Pravděpodobné příčiny
Stopped service, port/ACL/config or memory issue.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl status redis-server --no-pager
redis-cli ping
~~~

## Oprava
Oprav dostupnost/ACL bez zveřejnění credentials. Nepoužívej FLUSHALL jako první diagnostický krok.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
PONG a dokončený queue task. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Monitoring Redis a memory. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
