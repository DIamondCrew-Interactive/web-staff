---
title: "Panel vrací chybu 500"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 216
audience: ["admin","ai"]
tags: ["panel-500","troubleshooting","diagnostics"]
---

# Panel vrací chybu 500

## Příznaky
Laravel/PHP error after config or schema change.

## Pravděpodobné příčiny
DB connectivity, missing dependencies, wrong permissions or stale config.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl status php8.3-fpm mariadb redis-server --no-pager
~~~

## Oprava
Zkontroluj redigovaný Laravel error pro konkrétní čas. Oprav nalezenou DB/env/permission příčinu a invaliduj cache podle release postupu; negeneruj nový APP_KEY.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
Login, DB request a queue task. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Otestovaný update a konzistentní app/DB/config backup. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
