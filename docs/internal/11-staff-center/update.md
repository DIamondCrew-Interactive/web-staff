---
title: "Aktualizace Staff Centeru"
category: 11-staff-center
categoryTitle: "Staff Center"
order: 183
audience: ["admin","ai"]
tags: ["update"]
---

# Produkční nasazení a aktualizace Staff Centeru

## Produkční runtime a aktualizace

Produkční Staff používá `/etc/diamondcrew-staffcenter/runtime.compose.json`, projekt `diamondcrew-staffcenter`, pracovní adresář `/opt/diamondcrew-staffcenter` a jeho existující `.env` kontext. Tracked Compose je instalační vzor bez aktivního SSO a privátních mountů. Běžné up nad tímto vzorem by odstranilo živou konfiguraci. Runtime může obsahovat credentials: nevypisuj jej do veřejných logů ani Git.

~~~bash
docker compose --project-directory /opt/diamondcrew-staffcenter --env-file /opt/diamondcrew-staffcenter/.env -p diamondcrew-staffcenter -f /etc/diamondcrew-staffcenter/runtime.compose.json config --quiet
docker compose --project-directory /opt/diamondcrew-staffcenter --env-file /opt/diamondcrew-staffcenter/.env -p diamondcrew-staffcenter -f /etc/diamondcrew-staffcenter/runtime.compose.json ps
~~~

Před aktualizací privátně zálohuj runtime JSON, inspect obou kontejnerů, Git SHA a export obou image. Ověř shodu běžících kontejnerů s runtime. Build připrav z izolovaného archivu přesného schváleného commitu; resolved runtime není build konfigurace. V kopii runtime změň pouze image ID obou služeb. Zachovej `.env`, credentials, mounty, sítě, aliasy, environment a resource/security nastavení. Neobnovuj JSON z tracked Compose. Změny `.env` se do resolved environment automaticky nepromítají; změnu konfigurace připrav a ověř samostatně v privátní kopii runtime.

Po ověření image a všech invariantů přepni checkout na toto SHA, atomicky aplikuj runtime a recreate proveď se stejným úplným Compose kontextem a `--no-build --pull never`. Ověř oba health endpointy, image ID, 328 Cookbook stránek ve 22 kategoriích, veřejné/auth hranice a zachování runtime nastavení. Při změně adresy NPM aktualizuj privátní `TRUST_PROXY_CIDRS`. Restart ruší Staff sessions a nevyzvednuté SSO tickety.

Rollback používá zálohu konkrétního updatu: přesný původní runtime JSON, původní image a kompatibilní checkout. Neukládej rollback jako tracked Compose plus image override, ztratil by SSO mounty/env. Zachovej média a ostatní persistenci. Při cizí změně runtime nebo `.env` zastav automatické přepsání a proveď audit. Po rollbacku opakuj health a runtime kontroly.

## Ověřený stav 11. září 2026

Staff produkce je 1.3.1 (`ea740d`); 1.3.2 je připravovaná zdrojová verze. Proxy Manager 1.1 prošel nasazením a restartem s explicitním mapováním aplikačního uživatele 1. Controller 1.2.1 je nasazen s mapováním existujícího Unix UID 1001. UID 1000 v Docker návodech patří uživateli node ve Staff/Image kontejnerech, nikoli Controller mapování.

Proxy produkce používá `/etc/diamondcrew-interactive/npm-runtime.compose.json` s ověřeným existujícím project name, project directory a env-file kontextem. Tracked Proxy Compose stále odpovídá verzi 1.0. Při údržbě zachovej všechny credential/data mounty a sítě; neaplikuj instalační vzor ani obecný pull/up nad tracked Compose.

Image commit `cef7878` prošel izolovaným Linux Docker buildem a smoke testy health, syntetického veřejného PNG a odmítnutí anonymního management API. To není produkční CDN migrace ani ověření živého SSO. Původní CDN a `/uploads/` zůstávají zachovány; inventory staré služby není dokončeno. Herní `STATUS_TARGETS` zůstává prázdné bez Pterodactyl API credential a metriky UNKNOWN.

## Zaznamenané rollback body

Cesty jsou provozní reference, nikoli obsah záloh. Před spuštěním ověř shodu živého stavu s helperem a backup manifestem. Pro nový update vytvoř novou zálohu; starý helper není určen pro jinou baseline.

- Staff backup `/var/backups/diamondcrew-interactive/staff-patches/20260911T183130336770Z` patří přechodu 1.3.0 → 1.3.1; jeho rollback vrací 1.3.0, nikoli připravovanou 1.3.2.
- Proxy rollback: `python3 /var/tmp/dci-sso-rollouts-20260911/npm_sso_retry.py rollback --retry /var/backups/diamondcrew-interactive/npm-sso-retry/20260911T185327Z`. Původní 1.0 záloha: `/var/backups/diamondcrew-interactive/npm-sso/20260911T183408Z`.
- Controller rollback: `python3 /var/tmp/dci-controller-rollout-121-20260911.py rollback --backup /var/backups/diamondcrew-interactive/controller/20260911T184614Z`. Předchozí verzi určuje backup manifest; tento postup netvrdí návrat na 1.2.2.

[Související návody](index.md)
