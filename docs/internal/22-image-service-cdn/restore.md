---
title: "Restore media to an isolated volume"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 22
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Restore media to an isolated volume

## Preconditions
Schválená záloha, checksum, známý cílový Compose projekt a maintenance window. Neobnovuj přes živý volume. Uchovej současný stav pro návrat. Nejprve ověř hash archivu a tar listing: žádné absolutní cesty, '..', devices či symlinky.
## Procedure
1. Připrav nový named volume s jednoznačným jménem a dočasný Compose override volumes.media.name na tento volume. Původní volume nemazat.
2. Zastav image-service. Přes stejnou image spusť jednorázový tar helper nad NOVÝM volume, stdin z ověřeného archivu. Příklad příkazu se skutečným override souborem restore.override.yml:
~~~bash
docker compose --env-file .env.image -f docker-compose.image.yml -f restore.override.yml run --rm --no-deps -T --user root --entrypoint tar image-service -C /media -xpf - < /secure-backup/media.tar
docker compose --env-file .env.image -f docker-compose.image.yml -f restore.override.yml run --rm --no-deps -T --user root --entrypoint sh image-service -c 'chown -R 1000:1000 /media && find /media -type d -exec chmod 750 {} \; && find /media -type f -exec chmod 640 {} \;'
~~~
/secure-backup/media.tar je příklad, nikoliv zjištěná cesta. Práva upravuj pouze po kontrole obsahu a cílového nového volume. Neimportuj symlinky.
3. Audituj soubory, počty a sample checksums. Spusť service s override a otestuj URL/auth/cache.
## Rollback
Zastav novou instanci a vrať původní Compose volume mapping/image. Před pozdějším úklidem nejprve schval retenční dobu a ověř, který volume obsahuje která data.
