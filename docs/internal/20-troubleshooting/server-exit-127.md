---
title: "Server končí s kódem 127"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 224
audience: ["admin","ai"]
tags: ["server-exit-127","troubleshooting","diagnostics"]
---

# Server končí s kódem 127

## Příznaky
Process cannot execute startup command.

## Pravděpodobné příčiny
Missing executable, interpreter, library loader or wrong path.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
docker ps -a
~~~

## Oprava
Zkontroluj actual startup a Files. Existence binárky sama nestačí, může chybět interpreter/loader. Vyber kompatibilní runtime a oprav cestu.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
Proces startuje bez path/library chyby. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Startup smoke test pro novou i starou instanci. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
