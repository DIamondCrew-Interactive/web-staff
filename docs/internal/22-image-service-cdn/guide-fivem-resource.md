---
title: "Jak použít CDN URL ve FiveM resource"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 35
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Jak použít CDN URL ve FiveM resource

## Předpoklady
Povolený Discord účet pro /manage. Obrázky jsou veřejné; žádné citlivé soubory. Aktuální složku ověř v breadcrumbs.
## Postup
Uploadni inventory/food/burger.png a COPY URL ověř v browseru. V NUI HTML lze použít:
~~~html
<img src="https://img.dcrp.cz/inventory/food/burger.png" alt="Burger">
~~~
Konkrétní inventory resource může mít vlastní config pro image base URL: řiď se jeho dokumentací, neexistuje univerzální FiveM setting. Povol HTTPS img.dcrp.cz v CSP dané NUI, pokud ji používá. Při nedostupnosti CDN zobraz lokální fallback. URL neobsahuje admin token. Pro update s okamžitým efektem použij burger-v2.png.
## Ověření a řešení potíží
Zkontroluj výslednou cestu, metadata a případnou veřejnou URL. Chybu neopravuj blind overwrite nebo hromadným mazáním. [Podrobný postup](cors.md), [Řešení problémů](troubleshooting.md).
