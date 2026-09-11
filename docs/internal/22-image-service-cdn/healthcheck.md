---
title: "Kontrola dostupnosti Image Service"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 20
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Kontrola dostupnosti Image Service

## Nová služba
GET /healthz vrací pouze {"status":"ok"}. Docker kontroluje tento endpoint na interním3000 každých30s. Root canonical storage se ověřuje při startu; healthz dokazuje život procesu, nikoliv obsah všech obrázků nebo existenci DB, kterou tato služba nemá.
## Existující služba
Při ověření 2026-09-11 starý img.dcrp.cz/healthz vracel404. Nepovažuj za existující integraci. Staff Image Service karta proto nezobrazuje fake status.
## Monitoring
Po skutečném nasazení doplň HTTP probe na /healthz a druhý probe na konkrétní dlouhodobě stabilní test image. Porovnávej status/MIME nebo checksum; nepoužívej náhodný uživatelský obrázek, který může být smazán.
