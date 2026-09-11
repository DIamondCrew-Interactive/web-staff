# Správa uživatelů a přístupů (kandidát 1.4.0)

Tato funkce spravuje profily podle Discord ID, nevytváří skutečné Discord účty ani hesla. Nasazení nové verze samo nepřepne existující oprávnění. Bez `STAFF_ACCESS_STORE_DIRECTORY` zůstává původní konfigurace allowlistů aktivní. Následující postup je návrh nasazení; lokální testy nejsou potvrzením produkční aktivace.

## Postup pro správce

1. Přihlas se do DiamondCrew Interactive Staff Center svým Discord účtem a otevři **Přístupy**. Odkaz se zobrazuje pouze správci uživatelů.
2. Zvol **Nový profil**, vlož číselné **Discord User ID** daného člověka a přehledný název. Název není přihlašovací jméno. Existující ID vyber v seznamu; nezakládej jej podruhé.
3. Ponech profil aktivní a výslovně zaškrtni potřebné služby. Pro dalšího správce CDN stačí **Image Service — správa médií**. Nový profil nemá žádné služby automaticky. Oprávnění **Správce uživatelů a přístupů ve Staff** umožňuje přidělovat práva ostatním; nedávej je běžnému uživateli CDN.
4. Ulož profil. Uživatel se přihlásí přes Staff a otevře správu médií. Image oprávnění zahrnuje inventář i změny médií; není to omezená role pouze pro čtení ani omezení na vybranou složku.
5. Odebrání Image oprávnění nebo zablokování profilu zneplatní existující přihlášení při dalším chráněném požadavku. Rozpracované SSO přihlášení se nedokončí. Opětovné přidělení oprávnění neobnoví staré přihlášení. Již zahájený požadavek není zpětně odvolán. Veřejné soubory CDN zůstávají veřejné.
6. V **Auditu změn** najdeš kdo, kdy a co změnil včetně původního nastavení. **Obnovit a zahodit formulář** načte aktuální údaje a zruší rozpracované změny. Při souběžné úpravě jiným správcem je nutné údaje znovu načíst a změnu zkontrolovat.

Vlastní účet nelze zablokovat ani zbavit správy; systém nepřipustí odstranění posledního aktivního správce. Správce má přístup do Cookbooku. Controller a Proxy vyžadují vedle centrálního oprávnění připravený místní účet propojený s Discordem. Tato obrazovka nevytváří Unix ani NPM uživatele a neukončuje jejich již otevřená přihlášení. Server Manager a txAdmin zachovávají vlastní přihlášení a oprávnění. Veřejný status neobsahuje seznam uživatelů ani jejich práva.

## Bezpečné první zapnutí

Použij zálohu a explicitní produkční runtime Compose, zejména Staff `/etc/diamondcrew-staffcenter/runtime.compose.json`. Nepouštěj běžné `compose up` nad tracked Compose. Zachovej všechny ostatní environment hodnoty, obrazy ostatních služeb, mounty, sítě, Discord OAuth, podpisové klíče, service credentials a Controller/Proxy lokální mapy. Public Status nepotřebuje přístup k registru.

1. Zálohuj současný runtime a ověř existující Staff a jednotlivé service allowlisty. Připrav privátní adresář například `/etc/diamondcrew-interactive/access`, Unix mode `0700`, vlastník UID služby Staff (současné Staff/Image kontejnery používají UID 1000; ověř skutečný image). Toto UID není Controller Unix účet. Host a oba kontejnery musí umožnit čtení stejným oprávněným UID. Není dovolena veřejně čitelná cesta ani symlink.
2. Připoj **celý adresář** do Staff jako `/run/dci-access:rw`; do Image později tentýž adresář jako `/run/dci-access:ro`. Samostatný file bind není vhodný: atomická aktualizace mění inode souboru. Registr není uložiště SSO klíčů, ty ponech v jejich oddělených privátních mountech.
3. Ve Staff nastav `STAFF_ACCESS_STORE_DIRECTORY=/run/dci-access` a `STAFF_ADMIN_IDS=<ověřené Discord ID prvního správce>`. Žádné výchozí admin ID v kódu není. První bootstrap vyžaduje alespoň jedno explicitní admin ID. Další identity spravuje UI; změna bootstrap env nepřepisuje existující registr.
4. Pouze pokud chceš přenést stávající přístupy, nastav pro první bootstrap `STAFF_ACCESS_BOOTSTRAP_LEGACY=true`. Importuje Staff Cookbook allowlist a Staff SSO clients `allowedIds`; neudělá z nich správce. Bez tohoto flagu jsou vytvořeni jen explicitní správci bez service grantů. **Image lokální `allowed_ids` ani Controller/Proxy mapy se automaticky neimportují**: porovnej je předem se Staff konfigurací a chybějící schválené granty výslovně doplň. Rozdíly neřeš rozšířením práv všem.
5. Nasaď Staff kandidát s připraveným mountem, ověř přihlášení správce, importované profily a audit. Bootstrap vytvoří `access.json` a `.access-initialized` s mode `0600`. Poté můžeš bootstrap legacy flag vypnout a bootstrap admin seznam vyprázdnit; autoritou je registr.
6. Nasaď také Image verzi s podporou managed registru (kandidát 1.4.0). Nastav `IMAGE_ACCESS_STORE_DIRECTORY=/run/dci-access` a RO directory mount. Starší Image 1.3.3 tuto revokaci nepodporuje. Zachovej stávající media volume, veřejné URL/cesty, SSO issuer/keys/credential i proxy konfiguraci. Staff musí být v managed režimu před prvním managed Image přihlášením: Image požaduje podepsaný `access_epoch` a aktuální grant. V tomto režimu jsou práva určena registrem, nikoli starým statickým Image allowlistem.
7. Ověř nového druhého uživatele, který nebyl v legacy allowlistech, jeho přístup do správy a odmítnutí účtu bez grantu. Odeber grant a ověř zamítnutí již otevřeného přihlášení i rozpracovaného callbacku; zkontroluj veřejné mediální URL. Teprve po úspěchu nastav u Staff `LAUNCHER_IMAGE_ENABLED=true`, pokud dosud není zapnuté. Přepnutí karty nenahrazuje autorizaci ani SSO test.

Změny grantů zneplatňují i původní Staff přihlášení daného profilu. Uživatel se přihlásí znovu. Rozšířený claim `access_epoch` se posílá pouze audience `image-service`; Controller a Proxy zachovávají původní přesný formát assertion. Odebrání jejich centrálního grantu zabrání novému SSO, cílová aplikace spravuje již existující nativní přihlášení samostatně.

## Úložiště, provoz a obnova

Registr obsahuje metadata uživatelů a kompletní audit; není veřejné API. Zálohy celého adresáře a runtime drž privátní. Snapshot se zapisuje přes privátní dočasný soubor, fsync a atomický rename. Exkluzivní lock brání souběžnému zápisu; API navíc vyžaduje očekávanou revizi. Obrazovka neváže novou revizi na starý formulář. Aktuální limit je 1000 profilů a 8 MiB registru včetně auditu. Audit se automaticky nemaže; dosažení limitu blokuje další zápis a vyžaduje plánovanou správu kapacity.

Chybějící, nečitelný, nevhodně přístupný nebo poškozený managed registr vede k odmítnutí chráněného přístupu, ne k fallbacku na legacy allowlist. Veřejná média a veřejný status zůstávají nezávislé. `.access-initialized` brání opětovnému bootstrapu při ztrátě `access.json`: nemaž jej pro reset. Při chybě bootstrapu nebo obnově zastav zapisující Staff a obnov konzistentní privátní zálohu celého adresáře. Ponechaný `.access-write.lock` po pádu vyžaduje ověření, že neběží žádný zapisovatel; pouze poté jej správce odstraní. Neprovádí se automatické prolomení locku.

Rollback aplikace musí zachovat registr i runtime. Vypnutí managed režimu nebo návrat Image na starou verzi obnovuje starou autorizační politiku a může znovu povolit již odebrané uživatele: vyžaduje výslovné vyhodnocení a aktualizaci legacy pravidel, není to bezpečný automatický rollback. Samotný návrat souboru registru může vrátit dřívější oprávnění; obnovu kontroluj a restartuj chráněné služby, aby nezůstala stará přihlášení. Jeden aktivní Staff proces je podporovaný provozní model; sdílený soubor nenahrazuje distribuované session úložiště.

## Ověření kandidáta

`tests/access.test.ts` ověřuje API autentizaci/autorizaci, CSRF a body limity, bootstrap a ochranu před novým bootstrapem po ztrátě dat, souběžné revize, audit, ochranu správce, přesné Controller/Proxy claims a skutečný lokální Staff→Image tok nově přidaného Discord ID s prázdnými legacy allowlisty. Dále ověřuje revokaci, opětovný grant bez obnovení starých přihlášení, zachování veřejného PNG a izolaci veřejného statusu od registru. Lokální Discord transport je testovací; produkční Discord a browser přijetí musí proběhnout při nasazení.
