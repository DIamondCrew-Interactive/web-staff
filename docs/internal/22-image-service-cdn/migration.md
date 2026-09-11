---
title: "Migrace CDN se zachováním URL"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 23
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Migrace CDN se zachováním URL

## Cíl a inventář
Přesun existující img.dcrp.cz z jiného VPS. Původní host <cdn-server-ip>, media root <cdn-web-root>, cíl <new-cdn-server-ip>. Nic z toho nehádej. Ověř DNS A/AAAA/TTL, vlastnictví dat, zapisující aplikace, velikost, souborové typy, názvy, symlinky, case-sensitive kolize a reálně používané veřejné URL. Do nové knihovny nepatří staré PHP/config soubory.
## Záloha a kontrolní součty
Zastav legacy uploady nebo stanov snapshot + finální delta freeze. Z exportovaného schváleného image-only stromu vytvoř backup a relativní checksum manifest. Na zdroji po ověření skutečné cesty:
~~~bash
cd <cdn-web-root>
find . -type l -print
find . -type f -print0 | sort -z | xargs -0 -r sha256sum > /secure-backup/media-files.sha256
~~~
Placeholder nejprve nahraď skutečnou ověřenou cestou. Manifest mimo webroot. Nález symlinků zastaví import. Nesdílej výpisy obsahující secrets; root musí obsahovat jen schválená média.
## Nová služba a kopírování dat
Připrav nový VPS/service bez změny veřejného DNS. Přenes export přes SSH/rsync do staging adresáře, nejprve dry-run; zachovej relative hierarchy i velikost písmen. Proveď npm exec tsx scripts/audit-media.ts <staging-root>, porovnej manifest checksumů na cíli a vyřeš odmítnuté staré názvy či SVG před switchem. Audit nic neopravuje ani nepřejmenovává. Teprve poté importuj do nového volume při zastavené službě a nastav UID/GID1000, dirs750/files640.
## Ověření před přepnutím
Spusť service, healthz200. Ověř přes curl --resolve img.dcrp.cz:443:<new-cdn-server-ip> https://img.dcrp.cz/burger.png a skutečný vzorek nested URL. Porovnej bytes/MIME, statusy404, cache, CORS, management permissions. Certifikát musí platit; -k nepoužívej jako důkaz HTTPS.
## DNS a závěrečná synchronizace
Sniž TTL alespoň původní TTL předem. Při finálním freeze udělej delta sync a znovu checksum. Přepni schválené A/AAAA záznamy, zachovej HTTPS a ověř skutečné URL z více resolverů/klientů včetně FiveM NUI. Sleduj404,5xx,latenci a error rate. Starý host ponech po dohodnutou rollback dobu, bez rozcházejících se zápisů.
## Rollback
Při chybách vrať původní DNS záznamy i případná routing pravidla. Pokud už nový host přijal zápisy, před návratem inventarizuj a bezpečně přenes delta nebo schval ztrátu; DNS samo data nevrátí. Starý host/data nemaž do akceptace a ověřené nové zálohy.
