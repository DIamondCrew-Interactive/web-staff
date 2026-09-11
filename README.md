# DiamondCrew Staff Center + Infrastructure Cookbook

Veřejný rozcestník a status na `staff.diamondcrew.net`, Discord čtečka Cookbooku a samostatný `status.diamondcrew.net`. Bez Basic Auth, povinného hesla a fiktivních metrik. Repo: https://github.com/DIamondCrew-Interactive/web-staff.

Integrační kandidát `1.3.0` sjednocuje central Staff SSO, Image SSO, launcher a sdílený status. [Poznámky k verzi](docs/RELEASE-1.3.0.md) rozlišují ověřené lokální testy od produkčního nasazení. Produkční Docker gate a vydání Staff1.3.0 jsou samostatný krok.

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

## Přesný update na DIA-01 — až po schválení

Aktuální doplnění homepage/Image Service není na remote. Následující postup použij až po schváleném publikování konkrétního commitu; `v1.1.0` je předchozí Cookbook verze. Připrav samostatné servisní okno a ponech stávající NPM routy/sítě. Shell: Bash se sudo/docker právy.

1. Zálohuj aktuální checkout, env a oba běžící image. Příkazy nic nevypisují ze secrets:

```bash
set -eu
cd /opt/diamondcrew-staffcenter
test -z "$(git status --porcelain)" || { echo 'Nejprve uchovej lokální změny a zastav update.'; exit 1; }
backup="/opt/diamondcrew-staffcenter-backups/$(date -u +%Y%m%dT%H%M%SZ)"
install -d -m 700 "$backup"
git rev-parse HEAD > "$backup/commit"
git archive HEAD > "$backup/source.tar"
cp -p .env "$backup/env"
chmod 600 "$backup/env"
cp docker-compose.yml "$backup/docker-compose.yml"
for service in staffcenter public-status; do
  container=$(docker compose ps -q "$service")
  test -n "$container" || { echo "Chybí běžící $service; ověř stav ručně."; exit 1; }
  image=$(docker inspect --format '{{.Image}}' "$container")
  docker image tag "$image" "diamondcrew-staffcenter:rollback-$service"
done
printf '%s\n' "$backup"
```

Poznamenej si vypsanou cestu. Pokud má stará instalace vlastní neversionované docs, zálohuj je samostatně a sluč jen bezpečný schválený obsah. Následující tagy rollback nepřepisuj dalším updatem, dokud tento není ověřen.

2. Vyber přesný schválený commit a uprav env:

```bash
git fetch origin --tags
read -r -p 'Schválený nový commit SHA: ' approved_commit
git cat-file -e "$approved_commit^{commit}"
git checkout --detach "$approved_commit"
nano .env
chmod 600 .env
# SESSION_SECRET: vygeneruj lokálně openssl rand -hex 32 a ulož pouze do .env.
# Doplň Discord údaje a případné reálné STATUS_TARGETS.
# Odstraň staré Basic Auth proměnné; PROXY_NETWORK=diamondcrew-proxy.
docker network inspect diamondcrew-proxy >/dev/null 2>&1 || docker network create diamondcrew-proxy
docker compose config --quiet
docker compose build
docker compose up -d --force-recreate
docker compose ps
```

Cookbook je nyní uvnitř image; nepřidávej původní docs bind mount. Prázdná OAuth konfigurace start neblokuje. Build provede kontrolu celé dokumentace. Kontejnery běží jako neprivilegovaný uživatel, s read-only FS, healthcheckem a bez publikovaného host portu.

3. NPM musí být trvale připojen k external síti **`diamondcrew-proxy`**. V jeho Compose zachovej původní sítě a doplň:

```yaml
services:
  app: # ověř skutečný název NPM služby
    networks:
      - default
      - diamondcrew
networks:
  diamondcrew:
    external: true
    name: diamondcrew-proxy
```

Pokud již připojen je, nic neměň. Jinak aplikuj změnu z jeho vlastního Compose adresáře; nerecreateuj NPM naslepo z adresáře Staff Center.

| Doména | Scheme | Forward hostname | Port |
|---|---|---|---|
| staff.diamondcrew.net | http | staffcenter | 3000 |
| status.diamondcrew.net | http | public-status | 3000 |

Zachovej TLS/Force SSL. Staff NPM Access List nastav veřejný a odstraň starou Basic Auth. Necachuj `/auth/*`, `/api/*`, `/ai/*`. Callback code ani cookies neposílej do analytik.

4. Ověření:

```bash
docker compose exec -T staffcenter node -e "fetch('http://127.0.0.1:3000/healthz').then(r=>process.exit(r.ok?0:1))"
docker compose exec -T public-status node -e "fetch('http://127.0.0.1:3000/healthz').then(r=>process.exit(r.ok?0:1))"
curl -fsS -o /dev/null https://staff.diamondcrew.net/
curl -fsS https://staff.diamondcrew.net/api/public/status
curl -fsS https://status.diamondcrew.net/api/public/status
curl -fsS -o /dev/null https://staff.diamondcrew.net/ai/cookbook.md
curl -fsS -o /dev/null https://staff.diamondcrew.net/api/cookbook/bundle
curl -s -o /dev/null -w '%{http_code}\n' https://staff.diamondcrew.net/api/internal/docs/index
# očekáváno 401
curl -s -o /dev/null -w '%{http_code}\n' https://status.diamondcrew.net/api/cookbook/index
# očekáváno 404
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://staff.diamondcrew.net/api/cookbook/index
# očekáváno 405
```

V prohlížeči ověř povolený/nepovolený Discord účet, logout, hledání/TOC/copy a mobile. UNKNOWN před doplněním monitoringu je správný stav. Změny allowlistu/env aplikuj `docker compose up -d --force-recreate staffcenter`; existující sessions tím skončí.

## Přesný rollback

Vrať původní zdroj, env i zachované image bez rebuildování. Žádná aplikační DB migrace zde není. Do proměnné `backup` vlož skutečnou dříve vypsanou cestu:

```bash
set -eu
cd /opt/diamondcrew-staffcenter
read -r -p 'Cesta k záloze tohoto updatu: ' backup
test -f "$backup/commit"
test -f "$backup/env"
test -z "$(git status --porcelain)" || { echo 'Nejprve uchovej lokální změny.'; exit 1; }
git checkout --detach "$(cat "$backup/commit")"
cp -p "$backup/env" .env
chmod 600 .env
cat > "$backup/rollback.yml" <<'YAML'
services:
  staffcenter:
    image: diamondcrew-staffcenter:rollback-staffcenter
  public-status:
    image: diamondcrew-staffcenter:rollback-public-status
YAML
docker compose -f docker-compose.yml -f "$backup/rollback.yml" config --quiet
docker compose -f docker-compose.yml -f "$backup/rollback.yml" up -d --no-build --force-recreate
docker compose ps
```

Starý koncept může znovu vyžadovat původní Basic Auth; vrácený `.env` ji musí obsahovat. Obnov podle potřeby původní NPM Access List. Síť `diamondcrew-proxy`, certifikáty a upstream jména zůstávají. Ověř oba weby a healthchecks; zachované rollback image nemaž před přijetím nové verze.
