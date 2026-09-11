---
title: "Management UI workflow"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 6
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Management UI workflow

## Access
Otevři https://img.dcrp.cz/manage. Shell je veřejný, ale seznam i metadata vyžadují autorizovaný Discord účet. Nepovolený účet uvidí No internal access. Přihlášení nesdílí cookie se Staff Centerem: jde o jiný hostname.
## Navigation
Kliknutí vybere soubor/složku a otevře detail. Dvojklik na složku nebo tlačítko Otevřít složku vstoupí dovnitř. Breadcrumbs vrací do rodičů. Vyhledávání prochází podstrom aktuální složky podle filename/path, max. 1000 výsledků a 5000 prohlédnutých položek. Při truncation otevři užší složku.
## Actions
Toolbar: nová složka, výběr obrázků, upload review. Detail: preview, MIME, velikost, public URL, COPY URL, rename/move/copy file/delete. Dialog vyžaduje potvrzení každého delete; neprázdná složka vyžaduje opsání celé cesty. Copy se týká souborů, ne stromů.
## Verification
Po uploadu klikni COPY URL a načti ji v anonymním okně. Po rename se změní cesta a původní odkaz vrátí 404. Chyba obnoví inventory; neber částečný batch jako kompletní úspěch.
