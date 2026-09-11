---
title: "Současné CDN: ověřené a chybějící údaje"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 2
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Současné CDN: ověřené a chybějící údaje

## Inventář
Existující doména: https://img.dcrp.cz. Provozovatel uvádí jiný VPS než DIA-01. HTTP root při read-only ověření 2026-09-11 odpověděl 200, /healthz odpověděl 404. To není důkaz budoucí dostupnosti ani identity backendu. Staff karta je aktivní odkaz, ne zelený health claim.
## Chybějící údaje
IP = <cdn-server-ip>; media root = <cdn-web-root>; případné legacy admin přihlašování = <cdn-admin-secret>. Skutečné hodnoty získej neveřejně od správce. Neodvozuj filesystem z HTTP response ani nenastavuj DNS na DIA-01.
## Další kroky
Potvrď vlastnictví VPS, způsob SSH přístupu, web config, mounty, seznam používaných URL, storage velikost a zapisující klienty. Výpisy před sdílením rediguj. Poté použij [migration](migration.md). Legacy admin secret nová aplikace nepoužívá: management používá Discord.
