---
title: "NPM certificate problem"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 228
audience: ["admin","ai"]
tags: ["npm-ssl","troubleshooting","diagnostics"]
---

# NPM certificate problem

## Symptoms
Browser distrusts certificate or renewal fails.

## Likely Causes
Wrong domain, expired cert, DNS/challenge failure.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
curl -I https://staff.diamondcrew.net
~~~

## Fix
Zkontroluj cert domény, A/AAAA a challenge routing. Neřeš veřejný TLS vypnutím ověřování.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
HTTPS bez -k. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Monitoring expiry/renewal. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
