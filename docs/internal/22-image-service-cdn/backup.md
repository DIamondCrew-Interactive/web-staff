---
title: "Konzistentní zálohy obrázků"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 21
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Konzistentní zálohy obrázků

## Rozsah
Media volume, schválený commit/image digest a Compose. .env.image a privátní central SSO konfiguraci zálohuj odděleně neveřejně; Cookbook je neobsahuje. Zálohu ukládej na jiný disk/host a testuj restore.
## Záloha v Dockeru
Příkazy spouštěj v deployment adresáři po potvrzení servisního okna; zastavení znamená výpadek i veřejného čtení. Vytvoř soukromý adresář mimo media root.
~~~bash
backup="/opt/diamondcrew-image-backups/$(date -u +%Y%m%dT%H%M%SZ)"
install -d -m 700 "$backup"
docker compose --env-file .env.image -f docker-compose.image.yml stop image-service
docker compose --env-file .env.image -f docker-compose.image.yml run --rm --no-deps -T --user root --entrypoint tar image-service -C /media -cpf - . > "$backup/media.tar"
sha256sum "$backup/media.tar" > "$backup/media.tar.sha256"
cp -p .env.image "$backup/env.image"
chmod 600 "$backup/env.image"
git rev-parse HEAD > "$backup/commit"
docker compose --env-file .env.image -f docker-compose.image.yml up -d
~~~
Při jakékoliv chybě nepokračuj v destruktivní operaci a ověř stav služby. Backup tar může obsahovat soukromá historická data; nevkládej jej do Gitu. [Restore](restore.md).
