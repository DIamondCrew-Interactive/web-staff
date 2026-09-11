---
title: "Kontrola nahrávaných souborů a shodných názvů"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 7
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Kontrola nahrávaných souborů a shodných názvů

## Postup
Přihlas se a otevři cílovou složku. Vyber PNG/JPEG/WebP/GIF. Review ukazuje názvy a součet velikostí. Tlačítko Nahrát obrázky odešle multipart field files do POST /api/media/upload?path=... s session/CSRF.
## Kontrola souborů
Backend ověří jméno, extension, deklarovaný MIME a skutečný decode format. Sharp obraz plně dekóduje a reenkóduje bez metadat. SVG/executables/text vydávající se za PNG odmítne. Limity zahrnují velikost input/output, 40 milionů vstupních pixelů a nejvýše 200 animation frames. Re-encode může změnit bytes a kompresi; nehodí se jako archiv přesných originálů.
## Shodné názvy souborů
Výchozí výsledek shodného filename je 409, žádné tiché přepsání. Přejmenuj lokální soubor, nebo vědomě zaškrtni explicitní přepsání a odešli znovu. Před nahrazením používaného assetu uchovej originál a zvaž versioned name. Overwrite mění obsah stejné veřejné URL. [Cache](cache.md).
