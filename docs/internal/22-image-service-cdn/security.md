---
title: "Zabezpečení Image Service"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 25
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Zabezpečení Image Service

## Rozsah zabezpečení
Public read ano. Public write NE. Management inventory i metadata authorized-only. Každý write má allowlist a CSRF kontrolu před multipart parsingem. Není arbitrary filesystem API ani endpoint na spouštění příkazů. Input path pochází pouze z validovaných relativních segmentů, nikoliv libovolného URI/file path.
## Úložiště
Canonical root musí existovat. Každá komponenta lstat/realpath, symlinky odmítnuté; veřejný open používá O_NOFOLLOW tam, kde jej platforma podporuje. Root má výhradního writera: host root, další proces či writable bind mount může bezpečnostní předpoklad porušit. Repliky nejsou podporované. Kontejner nonroot, read-only filesystem mimo volume/tmpfs.
## Nahrávání
Whitelist MIME/extensions + plný decode/re-encode, limity file/batch/pixels/frames. SVG je zakázané. Žádné silent overwrites. Atomická publikace jednotlivého souboru, serializace mutací, bounded parser. HTTPS, nosniff, CSP a oddělený management CORS.
## Zbývající omezení
Není antivirový produkt, audit trail ani verzovací/undo úložiště. Chraň Discord účty, udržuj knihovny aktualizované, rate limituj v proxy a měj restore test. Neuploaduj důvěrná média: všechny soubory jsou veřejné. Všechny skutečné credentials zůstávají v secure env/backup, ne v Cookbooku.
