---
title: "HTTPS a central SSO callback"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 16
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# HTTPS a central SSO callback

## Nastavení
Na zvoleném VPS musí NPM znát doménu a mít funkční DNS/ACME ověření. NPM upstream http://image-service:3000, certifikát pro img.dcrp.cz a Force SSL. Nezakládej veřejný TLS listener v Node, pokud TLS končí na NPM.
## Přihlášení
Nová Image správa používá přesný callback https://img.dcrp.cz/auth/sso/callback schválený ve Staff brokeru pro audience image-service. Image nemá vlastní Discord OAuth callback. Cookie je Secure, proto produkční management nepoužívej přes HTTP IP. Nezapisuj SSO ticket ani callback query do analytics; auth routy necachovat.
## Ověření výsledku
curl -I https://img.dcrp.cz/healthz; otestuj certifikát, kompletní redirect, allowed/denied login a logout. Při přípravě před DNS switchem použij curl --resolve s novou IP a správnou doménou, nikoliv vypnutí ověření certifikátu.
