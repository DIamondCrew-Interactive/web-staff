---
title: "Nový Docker web na HTTPS subdoméně"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 261
audience: ["admin","ai"]
tags: []
---

# Nový Docker web na HTTPS subdoméně

## Účel a použití
Admin spustí Node.js HTTP aplikaci jako kontejner a publikuje ji přes NPM. Stejný model používá Staff Center; libovolná nová aplikace musí mít vlastní ověřený port a health endpoint.

## Prostředí a předpoklady
Browser → DNS → NPM → Docker DNS service hostname:internal port. Oba kontejnery jsou na diamondcrew-proxy. Ověř licenci, runtime a skutečný start příkaz projektu; vzor níže předpokládá existující Node server server.js, package-lock.json a endpoint /healthz.

## Proměnné a zástupné hodnoty
example-web je příklad service name. Port3000 a Node22 jsou pro tuto ukázku, nikoliv požadavek všech webů. V produkci zvol schválený image digest.

## Instalace a konfigurace
Dockerfile:
~~~dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node server.js ./
USER node
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
HEALTHCHECK CMD node -e "fetch('http://127.0.0.1:3000/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
~~~
Compose:
~~~yaml
services:
  example-web:
    build: .
    restart: unless-stopped
    expose: ['3000']
    networks: [proxy]
networks:
  proxy:
    external: true
    name: diamondcrew-proxy
~~~
Aplikace musí bindovat 0.0.0.0 uvnitř containeru. Přidej .dockerignore s .env, .git a node_modules. Skutečný projekt může vyžadovat build stage nebo data mount; postup přizpůsob jeho ověřené dokumentaci.

## Síť, DNS a reverse proxy
Připoj NPM trvale na shared síť. DNS example.pmrp.cz → 51.254.46.124 pro DIA-01. Proxy Host HTTP example-web:3000, potom Let's Encrypt a Force SSL. Není potřeba hostový published port.

## Ověření výsledku
~~~bash
docker compose config --quiet
docker compose up -d --build
docker compose ps
docker compose logs --tail=50 example-web
curl -I https://example.pmrp.cz
~~~
Healthcheck i veřejný obsah musí být správné.

## Záloha, aktualizace a rollback
Před build označ běžící image vlastním rollback tagem a zálohuj data/env odděleně. Nový build otestuj, pak recreate. Při regresi vrať uchovanou image a kompatibilní data/config bez nového buildu. Neloguj environment.

## Řešení problémů a další návody
502: síť, service DNS, port nebo bind localhost. [Docker installation](../14-docker/install.md), [NPM](../07-nginx-proxy-manager/compose.md).
