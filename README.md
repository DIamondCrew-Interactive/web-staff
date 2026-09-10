# DiamondCrew Interactive · Staff Center

Samostatný projekt připravený pro repozitář `DIamondCrew-Interactive/web-staff`.
Staff dashboard na `staff.diamondcrew.net` a veřejný status na `status.diamondcrew.net`.
Repozitář: `https://github.com/DIamondCrew-Interactive/web-staff`. První verze: `v1.0.0`. Publikace kódu nebo tagu nic nenasazuje na DIA-01. Release workflow není potřeba: Docker Compose sestaví image přímo z vybraného tagu.

Logo je originální PNG ze stejného brandingu jako DiamondCrew Server Manager, převzaté beze změn. Vizuál používá gradient `#2ec7ff → #f43cb2 → #f3d36b`. Původ a kontrolní součet loga jsou v `public/BRANDING.md`.

## Stack a struktura

React 19, TypeScript, Vite, Lucide, vlastní responsive CSS; Node.js 22 + Express 5, Docker Compose. Bez externích fontů, CDN, analytiky a frontendových tokenů.

```text
src/
  staff.tsx               interní dashboard
  public.tsx              veřejná status stránka (samostatný build)
  config/services.ts      centrální konfigurace launcherů
  components/ui.tsx       sdílený design a načítání statusu
  shared/types.ts         API datové typy
  styles.css              responsive design obou aplikací
server/
  config.ts               server-only .env a validace
  adapters.ts             Pterodactyl Client API / FiveM adaptér
  monitoring.ts           demo/live snapshot, cache, veřejná projekce
  app.ts                  izolace rout, hlavičky a staff autentizace
  index.ts                Express + Vite dev / produkční statický build
public/diamondcrew-logo.png originální DiamondCrew logo/favicon
tests/security.test.ts    ověření izolace, autentizace a validace
Dockerfile
docker-compose.yml
.env.example
```

## Obrazovky a chování

Staff: přehled, DIA-01 CPU/RAM/disk/uptime, core services, Management Tools, čtyři txAdmin karty, tabulka herních serverů s hledáním a PROD/DEV filtrem, Quick Actions. Mobilní navigace, loading, prázdná data, chyby a označení zastaralé poslední odpovědi.

Public: obecný stav, čtyři veřejné služby, graf historie, incident banner, údržba, automatický refresh. Nezobrazuje admin nástroje, interní hostname, porty, hráčské identifikátory nebo hardware metriky. Public kontejner neposkytuje staff API ani staff frontend. Veřejná JSON odpověď vzniká explicitním allowlistem, nikoliv mazáním citlivých polí z interního objektu.

`DATA_MODE=demo` je výchozí režim: jasně označené ilustrativní hodnoty, nikoli skutečně měřené zdraví infrastruktury. `DATA_MODE=live` aktivuje backendové adaptéry. Bez dat jsou metriky `null`/`—` a stav `DEGRADED` s vysvětlením. Hostové a databázové probe ani perzistentní historie zatím nejsou implementované, takže veřejná infrastruktura/web v live režimu zůstávají `DEGRADED`. Neukazuje se vymyšlených 100 % uptime.

### Dva odlišné druhy stavu

- `src/config/services.ts`: dostupnost nástroje pro spuštění. Každý záznam má `name`, `description`, `url`, `enabled`, `status`, `category`, `icon` a stabilní `id`. Pouze Server Manager je povolený. `enabled=false` renderuje neklikatelné `<article>`, bez odkazu nebo click handleru. Quick Actions čtou stejnou konfiguraci. `AVAILABLE` znamená povolený launcher, nikoliv potvrzený healthcheck cílové URL.
- Backend: runtime monitoring (`OPERATIONAL`, `DEGRADED`, `OFFLINE`, `IN PROGRESS`). `DEGRADED` pokrývá i neznámý stav; nedostatek dat neprohlašuje službu za online ani offline. Veřejná roleplay dostupnost vychází pouze z PROD serverů. DEV se do ní nepočítá. Údržba nastaví celkový stav `IN PROGRESS`, incident alespoň `DEGRADED`.

Frontend obnovuje data každých 30 s a ručně přes Refresh. Server má 15s cache, sdílený probíhající požadavek a 5s upstream timeout. Ruční refresh může vrátit stále platný cached snapshot; čas posledního měření to ukazuje. FiveM adaptér uchovává pouze počet hráčů, ne jména/identifikátory. Uptime uzlu a uptime procesu serveru jsou odlišné hodnoty.

## Přesné lokální spuštění (PowerShell)

Požadavky: Node.js 22+, npm. V kořenu projektu:

```powershell
Copy-Item .env.example .env
npm ci
npm run dev
```

Otevřít `http://localhost:3000` (Staff Center). Vývojový server bez vyplněných přihlašovacích údajů nevyžaduje přihlášení; tento režim patří jen do důvěryhodné lokální sítě. Poslouchá na `0.0.0.0` pro mobilní náhled.

Ve druhém PowerShell terminálu ve stejném adresáři:

```powershell
$env:APP_VARIANT = 'public'
$env:PORT = '3001'
npm run dev
```

Otevřít `http://localhost:3001`. Procesové proměnné přebíjejí `.env`. Vite middleware v developmentu zpřístupňuje zdrojové soubory: pro skutečně veřejný provoz používat výhradně produkční build.

Ověření:

```powershell
npm run typecheck
npm test
npm run build
```

Volitelná reprodukovatelná kontrola v prohlížeči:

```powershell
npx playwright install chromium
npm run test:browser
```

Testuje produkční aplikace na portech 4310–4312, responzivitu při 320/390 px, neklikatelné karty, filtry, chybový refresh, veřejný bundle bez interních adres a incident/maintenance režim. Screenshoty ukládá do ignorované složky `.artifacts/` a testovací servery po dokončení ukončí.

Lokální produkční test: vyplnit `STAFF_USERNAME` a silné `STAFF_PASSWORD` (alespoň 20 znaků) v `.env`, pak:

```powershell
$env:NODE_ENV = 'production'
$env:APP_VARIANT = 'staff'
$env:PORT = '3000'
npm start
```

Pro public změnit `APP_VARIANT=public` a `PORT=3001` v druhém terminálu. `GET /healthz` vrací 200 bez přihlášení a neprozrazuje konfiguraci. Healthcheck potvrzuje proces, nikoli zdraví upstream serverů.

## Bezpečné napojení Pterodactyl / FiveM

1. Založit dedikovaný účet v Pterodactylu s minimálním oprávněním číst vybrané servery. Vytvořit **Client API key**. Token patří pouze do serverového `.env`, nikdy do proměnných `VITE_*`.
2. Nastavit `PTERODACTYL_URL=https://panel.diamondcrew.net`, `PTERODACTYL_CLIENT_API_KEY=…`, `DATA_MODE=live`.
3. Vyplnit `PTERODACTYL_SERVERS` podle příkladu v `.env.example`. Použít krátký Client API identifier serveru, nikoliv numerické Application API ID. Nastavit správný projekt, PROD/DEV, node a port. Tyto metadata jsou konfigurace, nikoliv automatický discovery.
4. Adaptér volá pouze `GET /api/client/servers/{identifier}/resources` server-to-server. Čte stav, CPU, RAM a uptime procesu. Neprovádí power ani jiné změny. Pterodactyl CPU může přesáhnout 100 % při využití více jader.
5. Volitelný `fivemUrl` směruje z backendu na `/players.json` a `/info.json`. Endpointy musí být dostupné z kontejneru a podle konfigurace FiveM povolené. Redirecty jsou zakázané; žádné klientské parametry nemohou určovat cílovou URL.
6. Pro skutečné hostové DIA-01 metriky doplnit důvěryhodný agent/exporter do `server/monitoring.ts`. Nezaměňovat součet container CPU za hostové metriky. Pro Wings/DB/Redis/NPM doplnit serverové probes. Application API klíč není pro aktuální adaptér potřeba; případný budoucí discovery musí také zůstat na backendu.
7. Pro reálnou 60denní historii doplnit plánovaný collector + perzistentní databázi a agregaci dostupnosti. Aktuální paměťová cache historii neukládá. Pro velké nasazení je vhodný samostatný monitoring collector místo sběru v obou kontejnerech.

Připojení nebylo ověřeno proti vašemu živému panelu, protože nebyly dodány přístupy ani identifikátory serverů. API chyby uživateli nevrací upstream payloady ani tokeny.

## Přesný Docker deployment za Nginx Proxy Manager

Následující kroky jsou návod k pozdějšímu provedení; nejsou součástí provedeného nasazení. Požadavky: Docker Engine + Compose plugin, Nginx Proxy Manager na stejném Docker hostu, připravené DNS A/AAAA obou domén.

1. Repozitář je veřejný, proto lze konkrétní tag stáhnout přes HTTPS bez GitHub přihlašovacích údajů. Přihlášený administrátor na DIA-01 připraví pracovní adresář:

```bash
sudo mkdir -p /opt/diamondcrew-staffcenter
sudo chown "$(id -u):$(id -g)" /opt/diamondcrew-staffcenter
git clone --branch v1.0.0 --single-branch https://github.com/DIamondCrew-Interactive/web-staff.git /opt/diamondcrew-staffcenter
cd /opt/diamondcrew-staffcenter
git describe --tags --exact-match
```
2. Na serveru:

```bash
cd /opt/diamondcrew-staffcenter
cp .env.example .env
chmod 600 .env
openssl rand -hex 24
nano .env
```

Vložit vygenerované heslo do `STAFF_PASSWORD` a vyplnit `STAFF_USERNAME`. `DATA_MODE=demo` ponechá označené demo; pro reálná data použít `live` a dokončit adaptéry. U znaků `$` a `#` použít v `.env` jednoduché uvozovky; hex heslo tento problém nemá.

3. Připravit sdílenou síť (jednorázově):

```bash
docker network inspect diamondcrew-proxy >/dev/null 2>&1 || docker network create diamondcrew-proxy
```

Pokud již existuje síť NPM, použít její přesný název v `PROXY_NETWORK` místo vytváření nové. Přidat stejnou external síť do Compose NPM a připojit ji k jeho službě, aby se připojení zachovalo po recreate. Dočasně lze existující kontejner připojit příkazem `docker network connect diamondcrew-proxy JMENO_NPM_KONTEJNERU`, ale to nenahrazuje trvalou Compose konfiguraci.

Příklad doplnění do **existujícího** Compose NPM (zachovat jeho ostatní konfiguraci a sítě):

```yaml
services:
  app: # skutečný název vaší NPM služby
    networks:
      - default
      - diamondcrew
networks:
  diamondcrew:
    external: true
    name: diamondcrew-proxy
```

4. Sestavit a spustit v adresáři projektu:

```bash
docker compose config --quiet
docker compose build
docker compose up -d
docker compose ps
docker compose exec staffcenter node -e "fetch('http://127.0.0.1:3000/healthz').then(async r=>console.log(r.status,await r.text()))"
docker compose exec public-status node -e "fetch('http://127.0.0.1:3000/api/public/status').then(async r=>console.log(r.status,await r.text()))"
```

5. NPM → Proxy Hosts → přidat:

| Domain Names             | Scheme | Forward Hostname | Forward Port |
| ------------------------ | ------ | ---------------- | ------------ |
| `staff.diamondcrew.net`  | `http` | `staffcenter`    | `3000`       |
| `status.diamondcrew.net` | `http` | `public-status`  | `3000`       |

Pro oba vystavit SSL certifikát, zapnout **Force SSL** a HTTP/2. Aplikace používá serverovou Basic autentizaci staff části; pro tuto konfiguraci NPM ponechat Access List `Publicly Accessible`, protože dvě nezávislé Basic autentizace by soupeřily o hlavičku `Authorization`. To neodstraňuje autentizaci aplikace. Pro týmový provoz lze Basic auth později nahradit OIDC/SSO. Přístup veřejného hostu musí směřovat pouze na `public-status`.

6. Ověřit oba hosty:

```bash
curl -I https://staff.diamondcrew.net/
# 401, bez přihlašovacích údajů
curl -u VASE_STAFF_USERNAME https://staff.diamondcrew.net/api/staff/status
# curl se dotáže na heslo; očekáváno 200
curl https://status.diamondcrew.net/api/public/status
# 200, jen veřejná data
curl -i https://status.diamondcrew.net/api/staff/status
# 404
```

Obě aplikace uvnitř kontejnerů poslouchají na **3000**. Compose nepublikuje žádné hostové porty; přístup zajišťuje NPM přes Docker síť. Image běží jako neprivilegovaný `node`, s read-only filesystemem, bez capabilities a s healthcheckem. Síť musí povolit odchozí spojení k Pterodactylu a případným FiveM endpointům.

Aktualizace po změně souborů: `docker compose up -d --build`. Změna `.env`: `docker compose up -d --force-recreate`. Diagnostika: `docker compose logs --tail=100`. Zastavení: `docker compose down`.

## Incidenty a údržba

Vyplnit `PUBLIC_INCIDENT_TITLE` a `PUBLIC_INCIDENT_MESSAGE` a recreate public kontejner. Pro ukončení obě hodnoty vyprázdnit. Údržba: `PUBLIC_MAINTENANCE=true` a veřejný text `PUBLIC_MAINTENANCE_MESSAGE`; pro ukončení `false`. Jde o aktuální oznámení, ne perzistentní incident management nebo budoucí kalendář.

## Co je potřeba doplnit

- Případné další vizuální reference txAdmin/Server Manager UI pro navazující úpravy.
- Reálné Client server identifiers, projekty a prostředí; backendový token dodat bezpečně na server, neposílat do repozitáře.
- Zdroj hostových metrik, service probes a perzistentního uptime; produkční veřejné webové cíle.
- Název NPM sítě, DNS/SSL a staff přihlašovací údaje nebo budoucí OIDC poskytovatel.
- Finální veřejné incidenty/údržba. Do těchto textů nikdy nedávat interní data.
