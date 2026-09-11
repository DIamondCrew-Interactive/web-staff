---
title: "Jak obrázek smazat"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 33
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Jak obrázek smazat

## Předpoklady
Povolený Discord účet pro /manage. Obrázky jsou veřejné; žádné citlivé soubory. Aktuální složku ověř v breadcrumbs.
## Postup
Zjisti spotřebitele URL a uchovej zálohu. Vyber konkrétní obrázek → Smazat → v dialogu zkontroluj cestu → Smazat. Soubor zmizí ze seznamu, nový GET vrátí404. Cache může chvíli ukazovat starou kopii. Undo není implementované.
## Ověření a řešení potíží
Zkontroluj výslednou cestu, metadata a případnou veřejnou URL. Chybu neopravuj blind overwrite nebo hromadným mazáním. [Podrobný postup](delete.md), [Řešení problémů](troubleshooting.md).
