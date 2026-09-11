---
title: "Panel returns 502"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 217
audience: ["admin","ai"]
tags: ["panel-502","troubleshooting","diagnostics"]
---

# Panel returns 502

## Symptoms
NPM cannot obtain upstream response.

## Likely Causes
Wrong local nginx port, stopped nginx/FPM, NPM host routing.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl status nginx php8.3-fpm --no-pager
ss -ltnp
~~~

## Fix
Ověř lokální vhost s Host headerem a pak request ze sítě NPM. Oprav přesný port nebo službu, nikoliv DNS bez důkazu.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Lokální i veřejný request. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Zdokumentovaný upstream a healthcheck. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
