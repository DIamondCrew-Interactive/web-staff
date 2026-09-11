---
title: "Cache and invalidation strategy"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 14
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Cache and invalidation strategy

## Mutable filenames
Výchozí odpověď: Cache-Control public, max-age=300, must-revalidate; Content-Type podle whitelistu; ETag z metadat otevřeného souboru; Last-Modified. If-None-Match podporuje 304 a má přednost před If-Modified-Since. GET i HEAD sdílejí metadata. Mutable názvy nemají immutable flag.
## Replacing content
Po overwrite může klient až 300 sekund držet původní asset. Pro okamžitý rollout publikuj burger-v2.png nebo změň klientskou query verzi. URL v management preview obsahuje modified version pro refresh; Copy URL zůstává čistá stabilní cesta.
## Versioned assets
Preferuj nový filename s verzí/hash při velkých změnách. Dlouhou immutable politiku lze později aplikovat na vyhrazený skutečně immutable prefix; tato implementace ji plošně nezapíná. IMAGE_CACHE_SECONDS povoluje 1 až 86400; před zvýšením vyhodnoť overwrite workflow.
## Proxy
NPM nesmí přepisovat policy management/API na veřejnou cache. Nenastavuj globální immutable nad img.dcrp.cz.
