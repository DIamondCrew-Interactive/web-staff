---
title: "Central SSO: provoz a omezení"
category: 17-security
categoryTitle: "Zabezpečení"
order: 4
audience: [admin, ai]
tags: [sso, discord, access, rotation]
---

# Central SSO: provoz a omezení

## Kontrakt a přístup
DiamondCrew Staff Center ověřuje Discord pouze na svém hostname. Cílové služby mají vlastní browser-bound state/PKCE transakci, vlastní serverovou session a explicitní lokální mapování oprávnění. Staff membership nikdy automaticky nepřiděluje systémového administrátora. Audience jsou servercontroller, proxymanager a image-service. Server Manager si zachovává vlastní přihlášení.

Browser dostává opaque ticket, platný 45 sekund. Cílový backend jej pošle na /sso/api/redeem s odděleným service credential. Staff jednorázově vydá Ed25519 JWT s typ JWT, kid, přesným issuer/audience, numeric Discord ID jako JSON string, iat/exp/jti/state. Assertion žije nejvýše 45 sekund. Target ověřuje podpis, čas, browser state a replay před vytvořením nativní session. Discord OAuth secret ani Staff private key cílová aplikace nedostává.

## Bezpečná konfigurace
SSO je ve Staff implicitně disabled. Privátní soubor clients a Ed25519 klíč jsou mimo Git, service/root vlastnictví a restriktivní Unix oprávnění. Cíle mají pouze veřejné verification_keys a vlastní redeem credential. Docker overlay mountuje oddělený soukromý runtime adresář read-only. Při rotaci nejprve distribuuj nový public key/kid, potom přepni Staff signer a po jasně ohraničeném překryvu odstraň starý veřejný klíč. Kompromitovaný klíč vyžaduje okamžité odvolání; existující cílové sessions mají vlastní revokační postup.

Staff a Image používají jeden proces s paměťovými sessions/transakcemi; restart je ruší. Neškáluj další repliku bez sdíleného atomického úložiště. Staff logout blokuje nové issued/redeem granty původní session, neodhlašuje již založené cílové sessions.

## Reverse proxy a limity
TRUST_PROXY_CIDRS smí obsahovat pouze explicitní IP/CIDR skutečného reverse-proxy peeru. Výchozí prázdná hodnota ignoruje forwarding headers. Žádné trust=true ani hop-count. Proxy musí přepsat příchozí X-Forwarded-For důvěryhodnými informacemi; po recreate a změně jeho adresy aktualizuj runtime allowlist. Veřejný Cookbook skutečné adresy proxy nepotřebuje.

SSO redeem se nejprve autentizuje, pak čerpá vlastní per-service limit 600/minutu. Neplatné credentials mají oddělený per-IP limit 60/minutu. Staff OAuth starts mají 60/minutu per IP, issuance a Image starts 120/minutu per IP. Counters expirují a mají pevný paměťový limit. Neloguj query tickety, JWT nebo Authorization.

## Stav integrace 11. září 2026
Proxy Manager 1.0.0 byl nasazen. Controller 1.2 je integrační kandidát: native PAM test prošel, websocket a skutečný browser průchod ještě nejsou dokončené. Staff 1.3 je kandidát čekající na produkční Docker gate. Tyto podklady nejsou tvrzením o hotovém live end-to-end přihlášení všech služeb.

Původní Image CDN zůstává zachována včetně /uploads/ cest, migrace neproběhla a nová management UI není na produkční doméně ověřená. [Image oprávnění](../22-image-service-cdn/permissions.md) popisují připravenou novou aplikaci. Herní STATUS_TARGETS je nyní prázdné a produkční Pterodactyl API key není nakonfigurovaný: herní metriky musí zůstat UNKNOWN. Počet zjištěných kontejnerů sám nepřiděluje jejich identitu ani hráče.

## Ověření před přijetím
Ověř povolený i nepovolený účet, jinou audience, expirovaný a opakovaný ticket, state/PKCE mismatch, lokální logout, websocket a nativní operace služby. Chyba jednoho cíle nesmí měnit přihlášení jiných cílů. Lokální mock Discord a PAM testy samy nedokazují produkční browser session.
