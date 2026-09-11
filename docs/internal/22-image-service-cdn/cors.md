---
title: "CORS obrázků a chráněná API"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 15
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# CORS obrázků a chráněná API

## Veřejné obrázky
Obrázkové GET/HEAD a OPTIONS posílají Access-Control-Allow-Origin: *. Obrázky nejsou osobní ani session-dependent; veřejné čtení může využít FiveM NUI, canvas a web. Public route neposílá Access-Control-Allow-Credentials. Cross-Origin-Resource-Policy je cross-origin.
## Správa
/api/media nepovoluje wildcard CORS a běží ve stejném originu jako /manage. Session cookie + allowlist + CSRF chrání mutace. Nikdy nepřidávej globální CORS * s credentials do Express ani NPM.
## Ověření výsledku
curl -I https://img.dcrp.cz/kostka/1.png: image header *. Anonymní /api/media: 401 bez privilegovaného CORS. Preflight veřejného obrázku smí uvádět jen GET, HEAD, OPTIONS.
