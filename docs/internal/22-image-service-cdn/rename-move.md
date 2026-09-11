---
title: "Rename, move and copy"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 10
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Rename, move and copy

## Rename
Vyber soubor/složku → Přejmenovat → nový basename. Umístění zůstává stejné. Přípona souboru musí zachovat MIME; jpg↔jpeg je stejné médium, png→jpg přejmenováním není konverze.
## Move
Vyber Přesunout → zadej cílovou cestu OD KOŘENE včetně filename, například inventory/food/burger.png. Cílová rodičovská složka musí existovat. Stejný source/target, přesun složky do sebe a existující destination jsou odmítnuté. Složka se přesouvá jako celek po kontrole celého stromu.
## Copy
Kopírovat obrázek vytvoří druhý soubor bez odstranění původního. Copy folder není implementované. Cílový soubor se nikdy nepřepíše. Verify obou URL a aktualizace klientů jsou součást změny.
## Rollback
Přesun vrať opačným přesunem pouze pokud se cílová cesta mezitím nezměnila a původní je volná. Jinak obnov ze zálohy, ne blind overwrite.
