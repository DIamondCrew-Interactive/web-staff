# DiamondCrew Image Service

Samostatná připravená služba pro `img.dcrp.cz`; současný CDN na jiném VPS zatím zůstává beze změny. Starou IP ani filesystem path neznáme. Není součástí automatického startu Staff Compose.

## Runtime

`server/image.ts` → Express public image serving, `/manage` React UI, central Staff SSO a autorizované `/api/media` API. `server/media/storage.ts` definuje StorageAdapter a LocalStorageAdapter; S3 je budoucí adaptér, zatím není implementovaný. Veřejná URL přesně kopíruje relativní media cestu. Příklad `/media/inventory/food/burger.png` → `https://img.dcrp.cz/inventory/food/burger.png`.

GET/HEAD obrázků bez loginu; directory listing, metadata a všechny mutace vyžadují serverový allowlist. Writes navíc CSRF. UI umí složky, nested folders, upload/batch, preview/MIME/size/URL, Copy URL, search/breadcrumbs, rename/move, copy file, delete. Smazání neprázdné složky vyžaduje opsání celé cesty. Žádná správa mimo media root.

Povolené PNG/JPEG/WebP/GIF se plně dekódují a reenkódují přes Sharp; přípona i MIME musí odpovídat skutečnému formátu. SVG vypnuté. Default 25 MB/file, 50 MB/batch, 10 files. Upload mění bytes/metadata originálu; pro přesnou migraci použij auditovaný offline import. Žádné tiché přepsání. Jednotlivé soubory se publikují atomicky, batch není transakce při chybě disku.

Veřejná cache 300 sekund + ETag/Last-Modified/304, bez immutable pro mutable názvy. Veřejné image CORS `*`, management bez wildcard CORS/credentials. Žádný audit trail, trash/undo či S3 v této verzi. Storage root vlastní výhradně jedna instance; hostové změny/importy pouze po zastavení writera.

## Lokální spuštění

Node.js 22, PowerShell v kořeni repa. Pouze pro nový lokální env/storage:

```powershell
npm ci
Copy-Item .env.image.example .env.image
New-Item -ItemType Directory -Force .media
$env:DOTENV_CONFIG_PATH = '.env.image'
npm run dev:image
```

V `.env.image` lokálně nastav `IMAGE_PUBLIC_URL=http://localhost:3002`. Otevři `http://localhost:3002/manage`. Bez SSO konfigurace lze veřejně číst existující obrázky, management zůstane zamčený. Přihlašování používá Staff broker a privátní lokální konfiguraci podle [Image SSO](IMAGE-SSO.md); Image Service nemá vlastní Discord Client ID/Secret. Produkční broker povoluje jen explicitní produkční callback; lokální integrační testy používají izolované testovací instance.

## Produkční deployment — až po schválení

Nejdřív zvol CDN VPS; neautomatizuje se nasazení na DIA-01. Na něm checkout přesného schváleného commitu do zvoleného adresáře, například `/opt/diamondcrew-staffcenter`. Node není na hostu potřeba; Docker sestaví aplikaci.

```bash
cd /opt/diamondcrew-staffcenter
cp .env.image.example .env.image
chmod 600 .env.image
nano .env.image
docker network inspect diamondcrew-proxy >/dev/null 2>&1 || docker network create diamondcrew-proxy
docker compose --env-file .env.image -f docker-compose.image.yml config --quiet
docker compose --env-file .env.image -f docker-compose.image.yml build
docker compose --env-file .env.image -f docker-compose.image.yml up -d
docker compose --env-file .env.image -f docker-compose.image.yml ps
```

Existující `.env.image` nikdy nepřepisuj příkladem. Nastav `IMAGE_PUBLIC_URL=https://img.dcrp.cz` a pro management přidej [privátní SSO konfiguraci a Compose overlay](IMAGE-SSO.md). Ostatní env jsou v [.env.image.example](../.env.image.example). Named volume `diamondcrew-image-media` mountuje `/media` s UID/GID 1000:1000. Container port **3000**, žádný host port. Read-only root, tmpfs, nonroot, healthcheck, 1 GiB memory limit. Pro storage neexistuje veřejný write bypass.

NPM ve stejné external síti **diamondcrew-proxy**: `img.dcrp.cz` → `http://image-service:3000`, HTTPS/Force SSL, bez Basic Auth na veřejných obrázcích. Pro default batch `client_max_body_size 52m;`, `proxy_read_timeout 120s;`. Necachovat `/api`, `/auth`, `/manage`, nepřidávat globální privileged CORS. Zachovat ostatní NPM sítě. Výchozí Staff `docker-compose.yml` tuto službu nespouští.

Před DNS změnou postupuj podle [migration runbooku](internal/22-image-service-cdn/migration.md): inventory → backup → checksums → nový backend → staging/audit → import/práva → health/TLS/sample URL → finální freeze/delta → DNS switch → monitoring → případný DNS rollback. Původní backend nesmaž do akceptace. Detailní [backup](internal/22-image-service-cdn/backup.md) a [restore](internal/22-image-service-cdn/restore.md) používají oddělený volume; `down -v` nepoužívat.

## Audit offline importu

```bash
npx tsx scripts/audit-media.ts /approved/staging/media > media.sha256
```

Nebo v sestavené image `node build/scripts/audit-media.js /media`. Nástroj pouze čte a kontroluje formáty/cesty/symlinky a vypisuje SHA256 původních bytes; nic nepřejmenuje ani nepřepíše. Nenulový exit zastavuje migraci. Existující SVG/nepovolené názvy vyžadují vlastní rozhodnutí o kompatibilitě URL.

## Ověření

```bash
curl -fsS https://img.dcrp.cz/healthz
curl -I https://img.dcrp.cz/inventory/food/burger.png
curl -s -o /dev/null -w '%{http_code}\n' https://img.dcrp.cz/api/media
# 401 bez session
```

Použij skutečný existující sample filename. Ověř allowed/denied login, logout, batch, kolizi, rename/move, Copy URL a cache. Automatické testy: `npm test`, `npm run test:browser`; browser media test používá reálné management API a pouze mockovaný podepsaný broker response. Žádné testovací přihlašování v produkčních routách není.

## Podklady

[Discord User resource](https://docs.discord.com/developers/resources/user), [Multer](https://expressjs.com/en/resources/middleware/multer/), [Sharp image decoder](https://sharp.pixelplumbing.com/api-constructor/).
