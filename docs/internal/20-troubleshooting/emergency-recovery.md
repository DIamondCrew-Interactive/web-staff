---
title: "Emergency recovery decision"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 235
audience: ["admin","ai"]
tags: ["emergency-recovery","troubleshooting","diagnostics"]
---

# Emergency recovery decision

## Symptoms
Multiple infrastructure services unavailable.

## Likely Causes
Host/storage/network failure or security incident.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl --failed
docker ps
df -h
~~~

## Fix
Vyhlas incident, zastav nebezpečné nové zápisy, zajisti recovery konzoli a obnov podle DIA-01 LOST runbooku. Neexperimentuj s produkčními volumes bez zálohy.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Kontrolovaný návrat služeb s akceptací vlastníka. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Offsite backup a pravidelný restore test. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
