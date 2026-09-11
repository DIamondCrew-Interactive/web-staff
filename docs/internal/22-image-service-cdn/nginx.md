---
title: "Směrování NPM a limity nahrávání"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 18
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Směrování NPM a limity nahrávání

## Směrování
Na vybraném CDN VPS připoj NPM i image-service k external síti diamondcrew-proxy. Zachovej ostatní sítě NPM. Proxy Host img.dcrp.cz → scheme http, hostname image-service, port 3000. Certifikát + Force SSL. Veřejné image nesmějí být za NPM Basic Auth.
## Limity
Pro default batch 50 MB nastav v Advanced například:
~~~nginx
client_max_body_size 52m;
proxy_read_timeout 120s;
~~~
52m zahrnuje multipart overhead; backend limit 50 MB obrázkových dat zůstává autoritativní. Nesnižuj bezpečnostní backend limity jen kvůli chybě 413. V produkci omez request rate/connections na /api/media a sleduj 429; rate limit zónu spravuj v globálním NPM nginx configu, ne neplatnou direktivou v server snippet.
## Oddělení služeb
Necachuj /manage, /api, /auth. Nepřidávej alias na celý host filesystem. Public serving provádí image-service. Nepřidávej wildcard privileged CORS. Změnu NPM nejprve exportuj/zálohuj a po úpravě ověř config a sample GET.
