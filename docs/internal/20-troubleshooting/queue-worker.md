---
title: "Úlohy ve frontě se nedokončují"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 219
audience: ["admin","ai"]
tags: ["queue-worker","troubleshooting","diagnostics"]
---

# Úlohy ve frontě se nedokončují

## Příznaky
Pending emails or background operations.

## Pravděpodobné příčiny
pteroq stopped, Redis unavailable, wrong code generation.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl status pteroq redis-server --no-pager
redis-cli ping
~~~

## Oprava
Oprav Redis/systémovou službu, potom po správném deploymentu restartuj queue. Neopakuj již provedené operace bez kontroly idempotence.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
Testovací queued task dokončen právě jednou. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Monitoring pteroq a deploy queue restart. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
