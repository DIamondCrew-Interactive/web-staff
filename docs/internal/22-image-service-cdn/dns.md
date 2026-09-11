---
title: "Příprava DNS pro img.dcrp.cz"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 17
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Příprava DNS pro img.dcrp.cz

## Známé a chybějící údaje
Hostname je img.dcrp.cz. Aktuální A/AAAA záznamy, provider a IP nového VPS musí potvrdit provozovatel. Použij <cdn-server-ip> pro starý host a <new-cdn-server-ip> pro schválený cíl. DIA-01 není automaticky nový CDN host.
## Postup
Ulož současné A/AAAA/CNAME a TTL. Sniž TTL s dostatečným předstihem alespoň původního TTL. Připrav nový backend, data a certifikát; curl --resolve ověří konkrétní host bez switche. Po finální synchronizaci změň jen schválené záznamy. Ověř IPv4 i IPv6; starý AAAA nesmí zůstat náhodně na starém hostu.
## Rollback
Vrať přesnou původní sadu záznamů a ponech oba backendy funkční během propagace. DNS rollback nevrátí data vytvořená na novém hostu — před zápisy stanov freeze nebo back-sync plán. [Migration](migration.md).
