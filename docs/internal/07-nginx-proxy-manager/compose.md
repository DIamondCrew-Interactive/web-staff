---
title: "NPM Compose on a new host"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 259
audience: ["admin","ai"]
tags: []
---

# NPM Compose on a new host

## Purpose / Audience
Admin připravuje NPM s persistent daty a sdílenou proxy sítí. Na existujícím DIA-01 zachovej nginx-proxy-manager_app_1 a jeho skutečné mounts; tento vzor není příkaz je smazat.

## Architecture / Prerequisites
NPM publikuje 80/443 a spravuje HTTPS. Local nginx nesmí kolidovat na hostovém 80. Admin81 není veřejná aplikační adresa. Ověř Docker, porty a současnou konfiguraci.

## Variables / placeholders
NPM_IMAGE je ověřený jc21/nginx-proxy-manager release tag/digest dle oficiální dokumentace a registry; není zde vymyšlené číslo. Verzi vyber a potvrď před spuštěním.

## Installation / Configuration
Ve vlastním NPM project adresáři vytvoř .env s NPM_IMAGE a tento Compose. SQLite varianta je jednoduchý oficiálně podporovaný model; neměň na ni existující MariaDB NPM bez migračního plánu.
~~~yaml
services:
  app:
    image: ${NPM_IMAGE:?Set an approved NPM image tag or digest}
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'
      - '127.0.0.1:81:81'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    extra_hosts:
      - 'host.docker.internal:host-gateway'
    networks:
      - default
      - diamondcrew
networks:
  diamondcrew:
    external: true
    name: diamondcrew-proxy
~~~
~~~bash
docker network inspect diamondcrew-proxy >/dev/null 2>&1 || docker network create diamondcrew-proxy
docker compose config --quiet
docker compose pull
docker compose up -d
docker compose ps
~~~
Lokální admin81 spravuj přes schválený SSH tunnel/VPN a následně chráněnou admin proxy podle politiky. Přesný onboarding se řídí zvolenou NPM verzí, ne historicky zveřejněným default heslem.

## Networking / DNS / Reverse Proxy
Webové služby mají service hostname na diamondcrew-proxy. Hostové služby mohou použít host.docker.internal za předpokladu správného listeneru/firewallu. Subdomény A míří na 51.254.46.124 pro DIA-01. Vytvoř Proxy Host a zkontroluj upstream, teprve potom certifikát.

## Verification
Zvenčí otestuj veřejné 80/443 a jednotlivé domény. Admin81 nemá být globálně publikovaný tímto vzorem. Nejde o změnu současného container name inventáře.

## Backup / Update / Rollback
Před upgrade zálohuj data/letsencrypt a konkrétní image reference. Vrať kompatibilní image i datovou generaci při schema změně. NPM update není součástí automatického Staff deploymentu.

## Troubleshooting / Related pages
502 řeš až po přímém testu upstreamu. [Official setup](https://nginxproxymanager.com/setup/), [Docker network](docker-networks.md), [Host service](host-service.md).
