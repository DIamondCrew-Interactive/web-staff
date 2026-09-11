---
title: "Oprávnění ke správě přes central SSO"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 12
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Oprávnění ke správě přes central SSO

## Explicitní přístup
Po přijetí nového deploymentu vyžaduje /api/media serverovou Image session a numeric Discord ID uvedené v allowed_ids v privátním Image SSO configu. Totéž ID musí být povolené u audience image-service ve Staff brokeru. Žádná role se neodvozuje z nickname, Staff členství nebo JWT role claimu. Povolený manager může používat stávající mediální operace; read-only role zde není.

## Přihlášení a odhlášení
/auth/sso/start vytvoří browser-bound state a PKCE. Staff vrátí jednorázový opaque ticket, backend jej redeemuje a ověří Ed25519 JWT. Native Image cookie je HttpOnly/Secure/SameSite=Lax, životnost 1 hodina, writes a logout vyžadují X-CSRF-Token. Logout a restart ruší lokální session. Staff logout sám neruší již založenou Image session.

## Konfigurace
Privátní IMAGE_SSO_CONFIG_FILE obsahuje redeem_secret, verification_keys a allowed_ids. Image Service nemá Discord Client ID/Secret. Klíče ověřování jsou pouze veřejné; soukromý podpisový klíč je pouze ve Staff. Config mimo Git, runtime čtení pouze service účtem. Podrobně [central SSO](../17-security/central-sso.md). Produkční CDN zatím není migrovaná; nevydávej připravenou implementaci za nasazenou správu.
