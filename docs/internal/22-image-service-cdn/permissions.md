---
title: "Oprávnění ke správě přes Discord"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 12
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Oprávnění ke správě přes Discord

## Veřejné čtení
Obrázky nevyžadují login. Public root přesměruje na /manage shell a nezobrazuje inventory anonymně.
## Správa s oprávněním
Všechny /api/media GET i write routy vyžadují serverovou session a přesné ID v DISCORD_ALLOWED_USER_IDS. Write navíc X-CSRF-Token. Session 8 hodin, HttpOnly/Secure/SameSite=Lax v produkci, náhodný ID podepsaný SESSION_SECRET. Logout POST ruší session. Server Manager role ani Discord nickname nejsou oprávnění.
## Nastavení
Zaregistruj https://img.dcrp.cz/auth/discord/callback v Discord Developer Portal; doplň ID/Secret a allowlist do .env.image. Lze použít druhý redirect stejné aplikace nebo oddělenou aplikaci. Preferuj vlastní session secret pro tuto službu. Pro lokální vývoj callback http://localhost:3002/auth/discord/callback.
## Výměna přístupových údajů
Změna env vyžaduje recreate image-service a zruší sessions. Prázdné OAuth nastavení neblokuje image GET, ale správa se neodemkne. Žádný public admin token či write API key v browseru.
