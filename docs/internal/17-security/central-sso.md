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
DiamondCrew Interactive Staff Center ověřuje Discord pouze na svém hostname. Cílové služby mají vlastní browser-bound state/PKCE transakci, vlastní serverovou session a explicitní lokální mapování oprávnění. Staff membership nikdy automaticky nepřiděluje systémového administrátora. Audience jsou servercontroller, proxymanager a image-service. Server Manager si zachovává vlastní přihlášení.

Browser dostává opaque ticket, platný 45 sekund. Cílový backend jej pošle na /sso/api/redeem s odděleným service credential. Staff jednorázově vydá Ed25519 JWT s typ JWT, kid, přesným issuer/audience, numeric Discord ID jako JSON string, iat/exp/jti/state. Assertion žije nejvýše 45 sekund. Target ověřuje podpis, čas, browser state a replay před vytvořením nativní session. Discord OAuth secret ani Staff private key cílová aplikace nedostává.

## Bezpečná konfigurace
SSO je ve Staff implicitně disabled. Privátní soubor clients a Ed25519 klíč jsou mimo Git, service/root vlastnictví a restriktivní Unix oprávnění. Cíle mají pouze veřejné verification_keys a vlastní redeem credential. Docker overlay mountuje oddělený soukromý runtime adresář read-only. Při rotaci nejprve distribuuj nový public key/kid, potom přepni Staff signer a po jasně ohraničeném překryvu odstraň starý veřejný klíč. Kompromitovaný klíč vyžaduje okamžité odvolání; existující cílové sessions mají vlastní revokační postup.

Staff a Image používají jeden proces s paměťovými sessions/transakcemi; restart je ruší. Neškáluj další repliku bez sdíleného atomického úložiště. Staff logout blokuje nové issued/redeem granty původní session, neodhlašuje již založené cílové sessions.

## Reverse proxy a limity
TRUST_PROXY_CIDRS smí obsahovat pouze explicitní IP/CIDR skutečného reverse-proxy peeru. Výchozí prázdná hodnota ignoruje forwarding headers. Žádné trust=true ani hop-count. Proxy musí přepsat příchozí X-Forwarded-For důvěryhodnými informacemi; po recreate a změně jeho adresy aktualizuj runtime allowlist. Veřejný Cookbook skutečné adresy proxy nepotřebuje.

SSO redeem se nejprve autentizuje, pak čerpá vlastní per-service limit 600/minutu. Neplatné credentials mají oddělený per-IP limit 60/minutu. Staff OAuth starts mají 60/minutu per IP, issuance a Image starts 120/minutu per IP. Counters expirují a mají pevný paměťový limit. Neloguj query tickety, JWT nebo Authorization.

## Stav integrace 11. září 2026
Staff Center a Public Status 1.3.4 jsou nasazeny. Controller 1.2.2 a Proxy Manager 1.1.0 prošly nativním SSO ověřením. Image Service 1.3.3 je nasazená, migrace všech 3430 původních souborů byla ověřena přes HTTPS podle SHA a nativní SSO i upload prošly ověřením. Verze 1.4.0 se správou uživatelů a historií statusu je zatím pouze lokální, nenasazený kandidát.

Staff produkce používá `/etc/diamondcrew-staffcenter/runtime.compose.json`; Proxy `/etc/diamondcrew-interactive/npm-runtime.compose.json`. Běžné up nad tracked Compose by odstranilo runtime SSO konfiguraci. Zachovej credentials, mounty, sítě a explicitní project kontext. [Runbook a rollback](../11-staff-center/update.md).

Veřejné CDN cesty a původní názvy souborů zůstaly zachovány. [Image oprávnění](../22-image-service-cdn/permissions.md) popisují správu médií. Herní STATUS_TARGETS je prázdné a produkční Pterodactyl API key není nakonfigurovaný: herní metriky musí zůstat UNKNOWN. Počet zjištěných kontejnerů sám nepřiděluje jejich identitu ani hráče.

## Ověření před přijetím
Ověř povolený i nepovolený účet, jinou audience, expirovaný a opakovaný ticket, state/PKCE mismatch, lokální logout, websocket a nativní operace služby. Chyba jednoho cíle nesmí měnit přihlášení jiných cílů. Lokální mock Discord a PAM testy samy nedokazují produkční browser session.

## Správa uživatelů ve Staff (volitelný kandidát 1.4.0)

Správce otevře **Přístupy**, založí profil pomocí číselného **Discord User ID** a výslovně přidělí služby. Nevytváří tím Discord účet ani heslo. Nový profil nemá služby automaticky. Pro dalšího uživatele správy CDN zvol **Image Service — správa médií**; oprávnění správce uživatelů ponech jen lidem, kteří mají přidělovat práva ostatním. Existující ID uprav výběrem v seznamu. Obnova seznamu zahodí rozpracovaný formulář; souběžná změna vyžaduje novou kontrolu. Audit obsahuje autora, čas a stav před změnou i po ní.

Zapnutí vyžaduje nový Staff i Image backend, privátní sdílený directory mount (Staff RW, Image RO), `STAFF_ACCESS_STORE_DIRECTORY`, `IMAGE_ACCESS_STORE_DIRECTORY` a explicitní první `STAFF_ADMIN_IDS`. Bez nastavení registru běží původní pravidla. Jednorázový `STAFF_ACCESS_BOOTSTRAP_LEGACY=true` importuje schválené Staff allowlisty, nepřiděluje automaticky správce a neimportuje lokální účty cílových aplikací. Zachovej produkční runtime Compose, samostatné SSO klíče, credentials, lokální mapy a media volume. Public Status registr nepotřebuje. Image kartu aktivuj přes `LAUNCHER_IMAGE_ENABLED=true` až po skutečném ověření Image přihlášení.

V managed režimu odebrání Image grantu nebo blokace zneplatní již otevřené přihlášení při dalším chráněném požadavku i rozpracované SSO přihlášení. Opětovné přidělení grantu staré přihlášení neobnoví. Veřejné soubory zůstávají veřejné. Controller a Proxy vyžadují připravený účet propojený s Discordem a vlastní pravidla ukončení již otevřených přihlášení; Panel a txAdmin mají vlastní autorizaci. Chyba registru přístup odmítne, nepřepne zpět na legacy pravidla. Vlastní správu nelze odebrat a poslední aktivní správce je chráněn. Privátní registr včetně auditu a inicializačního markeru zálohuj jako celek. Podrobný instalační a obnovovací postup je ve zdrojovém `docs/ACCESS-MANAGEMENT.md`.
