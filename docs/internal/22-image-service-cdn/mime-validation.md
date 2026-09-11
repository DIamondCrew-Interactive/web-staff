---
title: "MIME and image decoding"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 13
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# MIME and image decoding

## Accepted formats
PNG image/png; JPG/JPEG image/jpeg; WebP image/webp; GIF image/gif. Upload prověřuje extension + deklarovaný MIME + Sharp metadata format + úplný decode/re-encode. Appended payloads a metadata se odstraní. SVG je zakázané, protože bezpečný sanitizer není implementovaný.
## Rejection cases
HTML s příponou .png, správné PNG deklarované text/plain, poškozený soubor, SVG a unsupported formats vrátí 415. Pixel/frame/file limity chrání image decoder. Neexistuje administrátorský přepínač k vypnutí validace.
## Imported files
Offline migrace upload pipeline obchází. Před importem použij audit-media.ts nad připraveným stromem, odmítni symlinky a neznámé formáty. Zachovej původní checksum; re-encode přes UI při migraci nemusí zachovat originální bytes.
## Sources
[Sharp constructor](https://sharp.pixelplumbing.com/api-constructor/), [Multer](https://expressjs.com/en/resources/middleware/multer/).
