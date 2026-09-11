---
title: "StorageAdapter a trvalé úložiště"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 4
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# StorageAdapter a trvalé úložiště

## Současné řešení
server/media/storage.ts obsahuje interface StorageAdapter a LocalStorageAdapter. read vrací otevřený handle; public route ho streamuje, nevrací absolutní filename. Root musí existovat a být canonical directory bez symlinků. Start nevytváří libovolnou cestu z env. Docker připravuje /media vlastněné UID/GID 1000:1000 a mountuje volume diamondcrew-image-media.
## Operace
list(path,search), mkdir(path), upload(path,validatedBytes,overwrite), move(source,target,copy), delete(path,kind,confirmation), stat(path), read(path), getPublicUrl(path). Mutace mají společný procesní zámek; souběžný zápis dostane 429. Každý upload se zveřejní atomickým rename z neveřejného dočasného souboru. Neúspěšná validace batch nic nezapíše; disk failure může zanechat část validovaného batch.
## Budoucí napojení S3
UI pracuje jen s relativními paths a metadata DTO. Implementuj ekvivalent adaptéru, objektové preconditions, pagination a copy+delete move semantics; session store a write coordination řeš před replikací. S3 není v této verzi implementované. Neodstraň URL contract.
