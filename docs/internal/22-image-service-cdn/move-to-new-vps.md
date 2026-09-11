---
title: "Přesun Image Service na jiné VPS"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 24
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Přesun Image Service na jiné VPS

## Rozdíl oproti migraci původní služby
Zde již existuje nová Node Image Service. Přenáší se media volume a runtime konfigurace; doména/path contract zůstává. Nejde o přemístění DIA-01 automaticky.
## Postup
1. Zaznamenej commit, image digest, env keys bez hodnot, volume identity a DNS.
2. Omez zápisy, vytvoř [consistent backup](backup.md) a checksum.
3. Připrav Docker/NPM na schváleném novém VPS; přenes zdroje, secure env a media odděleně.
4. Obnov do nového volume podle [restore](restore.md); ověř práva a obsah.
5. Spusť backend, ověř přes správnou doménu s --resolve sample image/healthz/login.
6. Finální delta freeze a DNS switch podle [migration](migration.md).
## Rollback
Ponech starou image, volume a konfiguraci beze změn do akceptace. Vrať DNS a sladěná data, pokud testy selžou. Session restart znamená nové přihlášení, nikoliv ztrátu obrázků.
