---
title: "Nasazení a aktualizace Staff Centeru na DIA-01"
category: 11-staff-center
categoryTitle: "Staff Center"
order: 255
audience: ["admin","ai"]
tags: []
---

# Nasazení a aktualizace Staff Centeru na DIA-01

## Účel a použití
Admin publikuje schválenou verzi do /opt/diamondcrew-staffcenter. Tento Cookbook pouze dokumentuje postup, nespouští jej. Aktuální lokální změna není pushnutá; starý v1.0.0 obsahuje jiný koncept.

## Prostředí a předpoklady
Repo https://github.com/DIamondCrew-Interactive/web-staff. Služby staffcenter a public-status používají internal3000 a external diamondcrew-proxy, na které je i NPM. Docker Engine/Compose, dostupné DNS/TLS a schválený commit jsou předpoklad.

## Záloha
Před novým build uchovej běžící image pod rollback tagem, current commit/Compose a .env ve secure backupu. Neukládej secrets do veřejného pracovního adresáře či Cookbooku. Stávající funkční release a tagy se nepřepisují.

## Konfigurace a proměnné
DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI, DISCORD_ALLOWED_USER_IDS a SESSION_SECRET jsou serverové. Callback je https://staff.diamondcrew.net/auth/discord/callback. Monitoring targety jsou STATUS_TARGETS s reálnými IDs/endpoints. Žádné browser VITE secrets.

## Postup aktualizace
Nejdřív musí být schválený kód dostupný v repozitáři nebo přenesený jako ověřený artifact. Nepředstírej, že dnešní remote již obsahuje lokální změny.
~~~bash
cd /opt/diamondcrew-staffcenter
git status --short
git rev-parse HEAD
git fetch origin --tags
git checkout <approved-commit>
docker network inspect diamondcrew-proxy >/dev/null 2>&1 || docker network create diamondcrew-proxy
docker compose config --quiet
docker compose build
docker compose up -d
docker compose ps
~~~
Před provedením checkout nahraď placeholder skutečným schváleným commitem. Lokální změny na serveru nesmí být přepsány bez uchování. Odstraň staré Basic Auth konfigurace a doplň env podle nové verze. Bez Discord nastavení veřejný web nastartuje, login bude neaktivní. Bez SESSION_SECRET se používá dočasný náhodný klíč; pro předvídatelnou produkční konfiguraci ho nastav bezpečně.

## Síť, DNS a reverse proxy
staff.diamondcrew.net → http://staffcenter:3000; status.diamondcrew.net → http://public-status:3000. NPM je trvale na diamondcrew-proxy. Zapni TLS/Force SSL a odstraň povinnou NPM Basic Auth před veřejnou staff stránkou. /auth a privátní docs/session se necachují.

## Ověření výsledku
~~~bash
curl -I https://staff.diamondcrew.net/
curl https://staff.diamondcrew.net/api/public/status
curl -i https://staff.diamondcrew.net/api/internal/docs/index
curl -I https://staff.diamondcrew.net/ai/cookbook.md
curl -i https://status.diamondcrew.net/api/cookbook/index
~~~
Očekávej postupně homepage200, safe status200, protected401, AI200/noindex, public status Cookbook404. Otestuj povolený i nepovolený Discord účet, logout a průchod kategorii/search/TOC/copy v UI.

## Rollback
Vrať zaznamenaný commit/Compose a kompatibilní env, nastav uchovanou image a spusť up -d --no-build --force-recreate. Při návratu na starý Basic Auth koncept musí odpovídat i původní přístupová konfigurace. Sessions restartem zaniknou; Cookbook neprovádí databázové migrace.

## Řešení problémů a další návody
Login failure: callback/origin/env/state. Docs503: validační chyba schváleného rootu. 502: síť/upstream/bind. [NPM Staff routing](../07-nginx-proxy-manager/staff.md), [Staff troubleshooting](../20-troubleshooting/staff-center.md).
