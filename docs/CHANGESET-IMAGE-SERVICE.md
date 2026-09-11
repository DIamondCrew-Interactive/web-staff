# Local review: homepage + Image Service

Základ: v1.1.0, commit c20958307025ea59f6698484ffa25d861d5c011d. Toto doplnění není commitnuté, pushnuté ani nasazené. Starý základ zachovává lokální backup/pre-image-service.

## Changes

8 hlavních karet, dodaná loga beze změny, žlutý DEV pruh, Infrastructure Services, jednoduché status řádky; Cookbook na /docs. Discord display name/avatar bez hardcoded identity. Image Service má vlastní entrypoint, bezpečný StorageAdapter, autorizované management API/UI, public image GET, Docker a offline media audit.

Město a datacentrum v public/scenes jsou dekorativní generované podklady, nikoliv loga nebo fotografie skutečného DIA-01. Konzole/síť jsou CSS dekorace. Reference neposkytuje skutečné provozní metriky, proto se nezobrazují.

## Verification

17 backendových testů a 6 browser testů prošlo; 3 produkční buildy, typecheck a kontrola 327 Markdownů/22 kategorií prošly. Nových Cookbook stránek: 40. Produkční Node Image Service smoke a read-only import audit prošly. Gitleaks nad pracovním exportem i historií: bez nálezů. npm audit: 0 zranitelností. Docker daemon zde není dostupný; skutečný Docker běh, vlastní Discord aplikace a migrace legacy médií vyžadují cílové ověření.

## Changed and new files (84)

- .dockerignore
- .env.image.example
- .gitignore
- Dockerfile
- Dockerfile.image-service
- README.md
- docker-compose.image.yml
- docs/CHANGESET-IMAGE-SERVICE.md
- docs/IMAGE_SERVICE.md
- docs/README.md
- docs/internal/01-getting-started/index.md
- docs/internal/11-staff-center/architecture.md
- docs/internal/19-ai-runbooks/diagnose-image-service.md
- docs/internal/19-ai-runbooks/index.md
- docs/internal/19-ai-runbooks/manage-image-service.md
- docs/internal/19-ai-runbooks/migrate-image-service.md
- docs/internal/19-ai-runbooks/upload-image.md
- docs/internal/22-image-service-cdn/architecture.md
- docs/internal/22-image-service-cdn/backup.md
- docs/internal/22-image-service-cdn/batch-upload.md
- docs/internal/22-image-service-cdn/cache.md
- docs/internal/22-image-service-cdn/cors.md
- docs/internal/22-image-service-cdn/current-service.md
- docs/internal/22-image-service-cdn/delete.md
- docs/internal/22-image-service-cdn/dns.md
- docs/internal/22-image-service-cdn/docker-deployment.md
- docs/internal/22-image-service-cdn/folder-structure.md
- docs/internal/22-image-service-cdn/folders.md
- docs/internal/22-image-service-cdn/guide-copy-public-url.md
- docs/internal/22-image-service-cdn/guide-create-folder.md
- docs/internal/22-image-service-cdn/guide-delete-image.md
- docs/internal/22-image-service-cdn/guide-fivem-resource.md
- docs/internal/22-image-service-cdn/guide-move-image.md
- docs/internal/22-image-service-cdn/guide-nested-folders.md
- docs/internal/22-image-service-cdn/guide-rename-image.md
- docs/internal/22-image-service-cdn/guide-upload-image.md
- docs/internal/22-image-service-cdn/healthcheck.md
- docs/internal/22-image-service-cdn/https.md
- docs/internal/22-image-service-cdn/index.md
- docs/internal/22-image-service-cdn/management-ui.md
- docs/internal/22-image-service-cdn/migration.md
- docs/internal/22-image-service-cdn/mime-validation.md
- docs/internal/22-image-service-cdn/monitoring.md
- docs/internal/22-image-service-cdn/move-to-new-vps.md
- docs/internal/22-image-service-cdn/nginx.md
- docs/internal/22-image-service-cdn/permissions.md
- docs/internal/22-image-service-cdn/public-url-structure.md
- docs/internal/22-image-service-cdn/rename-move.md
- docs/internal/22-image-service-cdn/restore.md
- docs/internal/22-image-service-cdn/security.md
- docs/internal/22-image-service-cdn/storage.md
- docs/internal/22-image-service-cdn/troubleshooting.md
- docs/internal/22-image-service-cdn/upload.md
- image.html
- package-lock.json
- package.json
- playwright.config.ts
- public/branding/dcrp.svg
- public/branding/prismatic.png
- public/scenes/city.png
- public/scenes/datacenter.png
- scripts/audit-media.ts
- server/app.ts
- server/auth.ts
- server/image.ts
- server/index.ts
- server/media/app.ts
- server/media/storage.ts
- src/components/Cookbook.tsx
- src/config/services.ts
- src/image.css
- src/image.tsx
- src/launcher.css
- src/shared/media.ts
- src/shared/types.ts
- src/staff.tsx
- tests/browser/dashboard.spec.ts
- tests/browser/media.spec.ts
- tests/cookbook.test.ts
- tests/fixtures/image-server.ts
- tests/media.test.ts
- tests/security.test.ts
- tsconfig.server.json
- vite.config.ts

## Deployment and open decisions

[Image Service deployment](IMAGE_SERVICE.md). Zvolit CDN VPS a potvrdit původní storage/IP neveřejně, dodat Discord aplikaci/allowlist, rozhodnout import případných legacy SVG či nekompatibilních názvů a servisní okno/DNS switch. S3 a horizontální replikace nejsou v této verzi implementované.
