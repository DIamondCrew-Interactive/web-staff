---
title: "Nasazení Image Service přes Docker Compose"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 19
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Nasazení Image Service přes Docker Compose

## Než začneš
Schválený nový commit, Docker Engine/Compose, vybraný CDN VPS, DNS/NPM přístupy, persistentní disk. Toto není deployment na DIA-01 a současnou CDN nemění automaticky. Samostatný docker-compose.image.yml je opt-in.
## Příprava
~~~bash
cd /opt/diamondcrew-staffcenter
cp .env.image.example .env.image
chmod 600 .env.image
nano .env.image
docker network inspect diamondcrew-proxy >/dev/null 2>&1 || docker network create diamondcrew-proxy
docker compose --env-file .env.image -f docker-compose.image.yml config --quiet
docker compose --env-file .env.image -f docker-compose.image.yml build
docker compose --env-file .env.image -f docker-compose.image.yml up -d
docker compose --env-file .env.image -f docker-compose.image.yml ps
~~~
Před cp zachovej případný existující .env.image; nikdy jej nepřepiš příkladem. Doplníš Discord credentials/allowlist/SESSION_SECRET. IMAGE_PUBLIC_URL=https://img.dcrp.cz. Container používá /media bez ohledu na lokální příklad ./.media.
## Trvalá data a zabezpečení
Named volume diamondcrew-image-media, UID/GID1000, read-only root FS, tmpfs /tmp, no-new-privileges, žádné host porty, healthcheck3000, paměť1GiB. Volume nepřipojuj dalšímu writeru. NPM je ve stejné síti. Nový prázdný volume převezme vlastnictví /media z image; starý import ověř a nastav oprávnění při zastavené službě.
## Ověření a rollback
GET /healthz200; známá image200; anonymní /api/media401; povolený management funguje. Před update zachovej image ID/tag, .env.image, Compose a media backup. Při rollback vrať image i kompatibilní zdroje/env, použij up -d --no-build, případně obnov data z ověřeného backupu. docker compose down -v nepoužívej — smaže média. [Migration](migration.md).
