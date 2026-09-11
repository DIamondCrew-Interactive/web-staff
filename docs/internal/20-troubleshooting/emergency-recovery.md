---
title: "Rozhodnutí o nouzové obnově"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 235
audience: ["admin","ai"]
tags: ["emergency-recovery","troubleshooting","diagnostics"]
---

# Rozhodnutí o nouzové obnově

## Příznaky
Multiple infrastructure services unavailable.

## Pravděpodobné příčiny
Host/storage/network failure or security incident.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl --failed
docker ps
df -h
~~~

## Oprava
Vyhlas incident, zastav nebezpečné nové zápisy, zajisti recovery konzoli a obnov podle DIA-01 LOST runbooku. Neexperimentuj s produkčními volumes bez zálohy.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
Kontrolovaný návrat služeb s akceptací vlastníka. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Offsite backup a pravidelný restore test. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
