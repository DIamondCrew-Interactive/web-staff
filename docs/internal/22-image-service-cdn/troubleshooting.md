---
title: "Řešení problémů Image Service"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 27
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Řešení problémů Image Service

## Diagnostika před změnou
Potvrď doménu, cílový host, verzi, image/container a zda jde o public GET nebo management. Nikdy nehledat chybu vypnutím auth či chmod777.
| Symptom | Check | Correction |
|---|---|---|
| 502 | NPM network/upstream3000, process health | stejná external síť, správné jméno |
| 404 image | exact path/case, import, reserved prefix | oprav URL nebo obnov schválený soubor |
| 401/403 management | session, ID allowlist, CSRF | znovu login, správné server env |
| 409 upload | shodný filename | rename nebo výslovné overwrite |
| 409 folder delete | chybí přesná confirmation | ověř inventory a opiš path |
| 413 | file/batch/count/proxy limit | menší batch, posouzená konfigurace |
| 415 | MIME/extension/decode/SVG | validní raster, nepovolovat skripty |
| 429 | probíhá jiný write | počkej, neopakuj souběžně |
| 503 | canonical root, mount permissions, disk | diagnostika cílového volume, restore plán |
| Stará image | mutable cache300s | vyčkej TTL nebo versioned filename |
## Kdy předat problém správci
Nález symlinku, nesoulad checksumů, nezjištěný legacy storage nebo potřeba bulk delete zastavuje změnu. Předej redigovaný nález a inventory. [Migration](migration.md), [Zabezpečení](security.md).
