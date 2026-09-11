---
title: "Monitoring Image Service"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 26
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Monitoring Image Service

## Sledované údaje
HTTP healthz a sample image, NPM access/error logs s404/5xx, skutečné disk usage/capacity a container restart/health. Nikdy nevymýšlej uptime historii ani počet assetů, pokud nejsou změřené. Request logs nesmějí obsahovat cookies, OAuth code ani Authorization.
## Postup
docker compose --env-file .env.image -f docker-compose.image.yml ps; lokálně ověř /healthz; veřejně sample URL/MIME. Pro disk ověř správný media volume přes docker volume inspect neveřejně a sleduj jeho backing filesystem. Image zůstane healthy i když konkrétní asset chybí; druhá sonda je nutná.
## Upozornění
Prahy nastav podle objemu dat a provozu. 429 při současných mutacích znamená procesní ochranu, 413 limit, 415 formát, 409 kolizi. Trvalé503 nebo 5xx vyžadují diagnostiku. [Řešení problémů](troubleshooting.md).
