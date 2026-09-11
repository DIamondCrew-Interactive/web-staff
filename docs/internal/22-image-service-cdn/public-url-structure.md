---
title: "Public URL and filesystem mapping"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 3
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Public URL and filesystem mapping

## Contract
Každá přijatá relativní cesta odpovídá právě jedné URL. Docker /media je nová implementační cesta; není to tvrzení o původním VPS.

| Relative media path | Public URL |
|---|---|
| burger.png | https://img.dcrp.cz/burger.png |
| kostka/1.png | https://img.dcrp.cz/kostka/1.png |
| inventory/food/pizza.png | https://img.dcrp.cz/inventory/food/pizza.png |

## Rules
GET/HEAD jsou veřejné. Adresář nemá directory listing. /api, /auth, /manage, /healthz, /assets, /branding, robots.txt a hlavní logo jsou rezervované top-level názvy. Absolutní cesty a escapování nejsou podporované. Public URL generuje backend z IMAGE_PUBLIC_URL, nikoliv z nedůvěryhodného Host headeru.
## Changing paths
Rename/move mění veřejnou URL a stará přestane fungovat. Před přesunem aktualizuj používající resources nebo ponech kopii. Migrace má zachovat stejnou cestu i velikost písmen. [Paths](folder-structure.md), [Cache](cache.md).
