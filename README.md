# DiamondCrew Staff Center + Infrastructure Cookbook

Veřejný rozcestník a status na `staff.diamondcrew.net`, Discord čtečka Cookbooku a samostatný `status.diamondcrew.net`. Bez Basic Auth, povinného hesla a fiktivních metrik. Repo: https://github.com/DIamondCrew-Interactive/web-staff.

Připravovaná verze `1.3.2` opravuje Image Docker build a produkční runbook. [Poznámky k verzi](docs/RELEASE-1.3.2.md).

## Nová homepage a Image Service

Staff používá dodané assety v public/branding (beze změny originálů) a hlavní DiamondCrew logo. DEV karty mají žlutý diagonální pruh. Desktop grid 4×2, tablet 2 sloupce, mobile 1. Personalizované jméno/avatar pochází z Discordu; žádné falešné notifikace. Cookbook není na homepage: header Documentation se zobrazí jen allowlisted uživateli a vede na serverově chráněnou /docs.

Původní Image CDN https://img.dcrp.cz zůstává zachována; nová management karta je IN PROGRESS do ověření nasazení. Nový management, API, Docker a migrace jsou popsány v [Image Service návodu](docs/IMAGE_SERVICE.md). Samostatný Compose docker-compose.image.yml nic nespouští na DIA-01 automaticky.

Nové entrypointy: src/image.tsx, server/image.ts, server/media/{app,storage}.ts, image.html, Dockerfile.image-service, .env.image.example. Přibyl audit offline médií scripts/audit-media.ts a 40 Cookbook stránek. Knihovna používá Multer a Sharp; public read / authorized write.

## Stack a struktura

Node.js 22, Express 5, React 19, TypeScript, Vite, Lucide, react-markdown/GFM, rehype-highlight, gray-matter; Docker Compose a Nginx Proxy Manager. Originální DiamondCrew logo je `public/diamondcrew-logo.png`.

```text
src/staff.tsx                  veřejný rozcestník, status, Discord; Cookbook na /docs
src/public.tsx                 čistá veřejná status stránka
src/config/services.ts         centrální konfigurace 8 hlavních + 2 infrastructure karet
src/components/Cookbook.tsx    kategorie, hledání, TOC, Markdown, copy, navigace
src/components/ui.tsx          sdílený design/status
server/auth.ts                 OAuth, state, podepsané session, allowlist
server/cookbook.ts             bezpečný loader, frontmatter, index, fulltext
server/docs.ts                 autorizované i anonymní read-only API
server/config.ts               server-only env, validace status targetů
server/adapters.ts             Pterodactyl, FiveM, HTTP
server/monitoring.ts           bezpečná veřejná projekce a cache
docs/internal/                 22 kategorií, 328 Markdown stránek
scripts/validate-cookbook.ts    kontrola metadat, odkazů, fences a cest
tests/                        backend, bezpečnost, prohlížeč
```

## Public, Staff a AI přístup

| Přístup | Obsah |
|---|---|
| Veřejný staff `/` | 8 hlavních karet (Server Manager + Services Status aktivní), Infrastructure Services, šest jednoduchých status řádků, Discord login |
| Veřejný status web | Prismatic Roleplay, DiamondCrew Roleplay, Minecraft, Infrastructure; bez DEV a admin nástrojů |
| Discord bez allowlistu | Veřejný web a nenápadné `No internal access` |
| Discord s allowlistem | Infrastructure Cookbook na `/docs` a `/api/internal/docs/*` |
| Anonymní AI | Schválený bezpečný obsah přes `/ai/cookbook.md` a `/api/cookbook/*` na staff hostu |

**Cookbook obsah není tajný.** Finální zadání záměrně povoluje anonymní AI čtení stejného obsahu. Discord chrání Staff čtečku a její API, nikoliv důvěrnost Markdownů. Unlisted URL, robots.txt a `X-Robots-Tag: noindex, nofollow` jsou pouze omezení dohledatelnosti. AI routy nejsou odkazované ve veřejném UI. Public-status varianta vůbec nemountuje OAuth ani Cookbook routy (404).

Dokumenty jsou verzované v tomto veřejném repozitáři a přibalené do serverové image. Nikdy do nich nepatří hesla, tokeny, APP_KEY, license keys ani privátní klíče. Nepublikuj zde žádný další skutečně důvěrný dokument. Text Markdownů není importovaný do browser bundlu. Reader ignoruje raw HTML a obrázky; Vite blokuje přímý přístup k docs/backendu/env.

### API

Veřejné: `GET /healthz`, `GET /api/public/status`.

Staff session: `GET /api/session`; vrací username, Discord display name/avatar URL, booleany přihlášení/oprávnění a logout CSRF token. Avatar URL je odvozena jen z validované Discord identity; žádný allowlist ani OAuth token.

Staff čtení s kontrolou session a allowlistu při každém požadavku:

```text
GET /api/internal/docs/index
GET /api/internal/docs/page/:path
GET /api/internal/docs/search?q=wings&filter=all
GET /api/internal/docs/raw/:path
GET /api/internal/docs/bundle
```

Bez session 401, nepovolený účet 403. `/api/internal/docs` je alias indexu.

Anonymní AI čtení:

```text
GET /ai/cookbook.md
GET /api/cookbook/index
GET /api/cookbook/page/04-wings/index
GET /api/cookbook/search?q=wings&filter=ai
GET /api/cookbook/raw/04-wings/index
GET /api/cookbook/bundle
```

Filtry: `all`, `user`, `infrastructure`, `ai`, `troubleshooting`. Path přijímá schválený slug s volitelným `.md`. Žádné zápisy, uploady ani spouštění příkazů; GET/HEAD only, ostatní metody 405 (privátní routy nejprve vyžadují auth). Loader odmítne symlinky, únik z kořene, duplicity, chybné metadata/odkazy; routy blokují i opakovaně zakódovaný traversal. Čte se výhradně `docs/internal/`, ne libovolná cesta. Neplatný Cookbook vrací kontrolované 503 bez filesystem detailů.

## Discord OAuth

1. `/auth/discord` vytvoří náhodný, jednorázový state svázaný s HttpOnly cookie na 10 minut.
2. Discord Authorization Code Grant se scope `identify`; callback ověří state i cookie, backend vymění code a načte `/users/@me`.
3. Discord ID se porovná se serverovým `DISCORD_ALLOWED_USER_IDS`. Browser dostane neprůhlednou, HMAC podepsanou session cookie; žádný Discord token.
4. Povolenému účtu se odemkne Cookbook, ostatním zůstává veřejný web. Logout POST vyžaduje CSRF token a ruší serverovou session.

Produkční cookies jsou `__Host-`, HttpOnly, Secure, SameSite=Lax, bez Domain. Session žije max. 8 hodin, restart ji zruší. Paměťové úložiště má limit, zahájení loginu limit 60/minutu/proces. Pro více staff replik nejprve přidej sdílené session úložiště. Access/refresh tokeny se neukládají.

Chybějící OAuth nastavení nezablokuje start; tlačítko bude neaktivní. Prázdný allowlist neodemkne Staff čtečku nikomu. `SESSION_SECRET` doporučeně vygeneruj `openssl rand -hex 32`; bez něj server vytvoří dočasný náhodný klíč. Nejde o heslo veřejného webu.

### Získání Client ID / Secret

V [Discord Developer Portal](https://discord.com/developers/applications) založ aplikaci DiamondCrew. V OAuth2 zkopíruj Client ID a vytvoř Client Secret. Bot není potřeba. Do OAuth2 Redirects i `DISCORD_REDIRECT_URI` vlož přesně:

```text
https://staff.diamondcrew.net/auth/discord/callback
```

Pro lokální vývoj přidej `http://localhost:3000/auth/discord/callback`. Produkce přijímá pouze HTTPS callback. V Discord Developer Mode zkopíruj User ID povolených osob, odděl čárkami. Role a username se pro autorizaci nepoužívají. [Oficiální Authorization Code Grant](https://docs.discord.com/developers/topics/oauth2).

## Env a reálné statusy

Serverové proměnné: `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DISCORD_REDIRECT_URI`, `DISCORD_ALLOWED_USER_IDS`, `SESSION_SECRET`. Dále `STATUS_TARGETS`, `PTERODACTYL_URL`, `PTERODACTYL_CLIENT_API_KEY`, `PUBLIC_INCIDENT_TITLE`, `PUBLIC_INCIDENT_MESSAGE`, `PUBLIC_MAINTENANCE`, `PUBLIC_MAINTENANCE_MESSAGE`, `PROXY_NETWORK`, `APP_VARIANT`, `PORT`. Viz [.env.example](.env.example).

Odstraň staré `STAFF_USERNAME`, `STAFF_PASSWORD`, `DATA_MODE`, `PTERODACTYL_SERVERS`. Secrets nikdy nedávej do `VITE_*`. Veřejná oznámení jsou záměrně veřejný text a nesmějí obsahovat interní adresy/secrets.

`STATUS_TARGETS` je JSON s nejvýše šesti známými ID: `prismatic-prod`, `prismatic-dev`, `diamond-prod`, `diamond-dev`, `minecraft`, `dia-01`. Volitelná pole: `pterodactylId`, `fivemUrl`, `healthUrl`, `maintenance`. URL jsou pouze z env, bez credentials/query/fragment; HTTP healthcheck může mít path. Redirecty zakázané, timeout 5 sekund.

- Pterodactyl Client API `/api/client/servers/{identifier}/resources`: running → ONLINE, offline → OFFLINE, starting/stopping → DEGRADED; neplatný payload/chyba API → UNKNOWN.
- FiveM `/players.json`: platné pole → skutečný počet hráčů a ONLINE, chyba → UNKNOWN. Jména/identifikátory hráčů se zahodí.
- HTTP 2xx → ONLINE, neúspěch/timeout → OFFLINE vzhledem k vybranému healthchecku. Probe musí skutečně reprezentovat danou službu.
- Priorita zdrojů: Pterodactyl, FiveM, HTTP. FiveM doplňuje players jen při ONLINE. Údržba přebíjí probes na MAINTENANCE.
- Minecraft lze sledovat přes Pterodactyl nebo existující HTTP exporter; nativní Minecraft player ping není implementovaný.

Bez zdroje UNKNOWN, žádná demo data. Odezva je naměřené trvání HTTP requestu, nikoliv ICMP ping. UI refresh 30 s, backend cache 15 s. API explicitně vybírá pouze bezpečná veřejná pole; nevrací IP, upstream URL, API identifikátory, tokeny, hostové CPU/RAM či domnělou historii uptime.

## Cookbook

22 kategorií / 328 stránek. Kategorie: Getting started; DIA nodes; Server Manager installation; Wings; FiveM; txAdmin; Nginx Proxy Manager; Web hosting; DNS/HTTPS; Cockpit; Staff Center; Public Status; Databases/Redis; Docker; Backups; Monitoring/Operations; Security; Server Manager User Guide; AI Runbooks; Troubleshooting; Disaster Recovery; Image Service / CDN.

Podrobné postupy pokrývají čistý Debian → Panel → Wings → test server → branding, nový game node, celou control plane, FiveM/txAdmin, Minecraft/Source server, Egg/Nest, web ze složky, Docker web za NPM, backup/restore a DIA-01 LOST. Inventář uvedený uživatelem je rozlišen od obecných požadavků a příkladů; neznámé údaje mají placeholder. Instalační příkazy nejsou automatický installer a nebyly spuštěny na DIA-01. Před použitím ověř cílový stav a verze podle přiložených primárních zdrojů.

Formát, přidání dokumentu a bezpečnostní pravidla: [docs/README.md](docs/README.md). Výchozí stránka: [Getting started](docs/internal/01-getting-started/index.md).

## Lokální spuštění a kontroly

Node.js 22+, v kořenu projektu:

```powershell
Copy-Item .env.example .env
npm ci
npm run dev
```

Staff `http://localhost:3000`. Pro status ve druhém terminálu:

```powershell
$env:APP_VARIANT = 'public'
$env:PORT = '3001'
npm run dev
```

```powershell
npm test
npm run check:docs
npx playwright install chromium
npm run test:browser
npm audit
```

Browser test zahrnuje tři production buildy a typecheck. Backend testy simulují Discord transport, nikoliv testovací bypass routu. Testuje se allowlist, state/replay, CSRF, expiry, veřejný status, AI read-only API, traversal/symlinky, index/odkazy/frontmatter/fences, browser bundle a responsive Cookbook. Skutečný Discord login, Docker runtime a živé upstreamy vyžadují cílové přístupy.

Secret scan před publikací: Gitleaks nad Git historií a nad exportem aktuálních verzovaných + neignorovaných nových souborů, včetně `docs/internal/`. Neignoruj nalezený secret jen proto, aby kontrola prošla. `.gitignore`/`.dockerignore` vylučují env, keys, dumps, `.artifacts` a lokální build výstupy.

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
