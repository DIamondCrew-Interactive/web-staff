---
title: "Problémy s přihlášením a statusem Staff Centeru"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 234
audience: ["admin","ai"]
tags: ["staff-center","troubleshooting","diagnostics"]
---

# Problémy s přihlášením a statusem Staff Centeru

## Příznaky
Public works but login or Cookbook does not.

## Pravděpodobné příčiny
OAuth callback mismatch, missing allowlist, expired session, invalid docs metadata.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
docker compose ps
docker compose logs --tail=50 staffcenter
~~~

## Oprava
Ověř callback přesně, env nastavení bezpečně a allowlist ID. No internal access není chyba veřejného webu. Docs503 vyžaduje check:docs, ne obejití autorizace.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
Anonymous200, protected401, allowed docs200, AI200. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Auth security tests a docs validation před build. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
