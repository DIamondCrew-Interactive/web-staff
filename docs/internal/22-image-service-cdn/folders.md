---
title: "Vytváření a mazání složek"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 9
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Vytváření a mazání složek

## Vytvoření
Nová složka → zadej kostka → Uložit. Vnořenou strukturu vytvoří inventory/food, relativně k právě otevřené složce. Backend mkdir postupně kontroluje každý segment a nevstupuje do symlinků. Existující legitimní složka se znovu nemaže ani nenahrazuje.
## Odstranění
Vyber složku → Smazat. Prázdnou lze potvrdit přímo. Pro neprázdnou opiš úplnou relativní cestu, například inventory/food. API vyžaduje confirmation přesně shodný s path; kořen nelze odstranit. Strom nad 10000 položek vyžaduje zvlášť plánovanou offline správu.
## Rollback
Po delete obnov konkrétní podstrom ze zálohy při zastavených zápisech. V této verzi není trash ani undo. Než potvrdíš, ověř spotřebitele URL. [Backup](backup.md), [Delete](delete.md).
