---
title: "Hromadné nahrávání a částečné selhání"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 8
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Hromadné nahrávání a částečné selhání

## Limity
Výchozí IMAGE_MAX_UPLOAD_MB=25 pro jeden soubor, IMAGE_MAX_BATCH_MB=50 pro batch, IMAGE_MAX_BATCH_FILES=10. Max configurable hodnoty jsou 100 MB/file, 200 MB/batch, 25 files. Doporučeně ponech default a slaď NPM body limit. Multipart parser má i streaming aggregate limit, nejde jen o kontrolu Content-Length.
## Postup
Otevři cílovou složku, vyber více souborů, zkontroluj jejich názvy a review, potvrď upload. Duplicate names uvnitř batch se odmítnou, stejně jako kolize existujícího názvu bez overwrite. Nejprve se validují všechny obrázky; až poté proběhnou zápisy.
## Řešení chyb
415 = obsah/type, 413 = velikost/počet, 409 = kolize, 429 = jiná probíhající mutace, 503 = storage či procesní problém. Při disk failure může část batch existovat: obnov seznam a porovnej konkrétní filenames, neopakuj blind overwrite. Pro bulk změnu nejprve backup+inventory.
