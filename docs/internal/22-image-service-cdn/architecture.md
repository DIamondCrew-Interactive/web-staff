---
title: "Image Service architecture"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 1
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Image Service architecture

## Purpose
Samostatná Image Service pro img.dcrp.cz, nikoliv monitoring ani obecný file manager. Stávající CDN běží na jiném VPS než DIA-01. Tento repozitář připravuje náhradu; na původní službě nic nemění.
## Components
NPM ukončuje TLS → Node/Express image-service:3000. Veřejný GET obrázku streamuje soubor z persistentního media volume. /manage je React UI; /api/media je privátní API. Discord identita, allowlist, session a CSRF jsou serverové. StorageAdapter odděluje list/mkdir/upload/move/delete/stat/read/getPublicUrl; LocalStorageAdapter je implementovaný, S3 adapter zatím nikoliv.
## Deployment boundary
Samostatný Compose projekt diamondcrew-images. Pouze jeden proces a jeden writer na media root. Žádný další kontejner ani hostový automat nesmí za běhu přepisovat volume: kontrola cest předpokládá výhradní vlastnictví stromu. Externí migraci/import dělej při zastavené službě. Více replik vyžaduje sdílené sessions a distribuované zámky nebo object storage.
## Verification
Public image GET 200 bez session; /api/media bez session 401; povolený účet vidí seznam. Služba nevrací hostové cesty, konfiguraci či credentials. [Deployment](docker-deployment.md), [Security](security.md).
