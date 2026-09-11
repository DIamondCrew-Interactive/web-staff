---
title: "Mazání s potvrzením"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 11
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Mazání s potvrzením

## Rozhraní
Veřejné DELETE má 405. Management DELETE vyžaduje session, allowlist a CSRF. UI vždy zobrazí dialog s konkrétní cestou. DELETE /api/media/file smaže jeden soubor; /folder jen odpovídající typ. Neprázdná složka vyžaduje confirmation=celá relativní cesta. Root delete není povolený.
## Před smazáním
Zjisti zda URL používá FiveM resource nebo web. Ulož zálohu nebo kopii pod verzovaným názvem. U bulk zásahu nejprve inventory+backup a explicitní souhlas vlastníka. Zkontroluj, že cesta odpovídá správnému prostředí.
## Po smazání
GET vrátí 404; cache může původní obraz zobrazovat až 300 sekund. Žádný soft-delete/undo zde není. Obnov jednotlivý soubor z bezpečného backupu, pokud deletion byla chybná. Nikdy neřeš 404 vytvořením prázdného souboru.
