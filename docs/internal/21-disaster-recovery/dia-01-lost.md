---
title: "Ztráta DIA-01: obnova na čistém serveru"
category: 21-disaster-recovery
categoryTitle: "Obnova po havárii"
order: 254
audience: ["admin","ai"]
tags: []
---

# Ztráta DIA-01: obnova na čistém serveru

## Účel a použití
Obnovit DiamondCrew po ztrátě DIA-01 na čistém stroji. Recovery vede admin s vlastníkem incidentu; AI nejprve ověří dostupnost backupů a schválené přepnutí provozu.

## Prostředí a předpoklady
Původní host: dc-node01, Debian12, 51.254.46.124. Náhradní host může mít jinou IP, CPU architekturu a subnety. Neodvozuj kompatibilitu pouze z názvu DIA-01.

Musí existovat mimo ztracený host: konzistentní panel/game DB dumps, Pterodactyl volumes, txData/server-data, verze aplikací/Eggů/artifactů, NPM data, secure env s původním APP_KEY/DB credentials, Wings identity, přístup k DNS/registry/Discord a klíče k šifrovaným backupům. Skutečné values sem nepatří. Bez původního APP_KEY mohou být šifrovaná data Panelu neobnovitelná i s DB dumpem.

## Záloha a omezení dopadu incidentu
Pokud původní host částečně žije, zajisti konzistentní kopii a zastav konflikt zápisů. Vyhlas veřejný incident, určete skutečné RPO/RTO a recovery vlastníka. Při podezření na kompromitaci neobnovuj bez kontroly nedůvěryhodný executable.

## Postup obnovy
1. OS: nainstaluj čistý Debian12, ověř disky, čas a architekturu.
2. Users/SSH: vytvoř osobní sudo účet a test druhé session; zachovej recovery konzoli.
3. Docker: postup z Docker install; inspect všech subnetů, vyber volné IPAM rozsahy.
4. MariaDB: nainstaluj kompatibilní verzi, připrav chráněný restore prostor a aplikaci nepřipojuj před obnovou.
5. Redis: lokální bezpečná konfigurace a PING. Queue nespouštěj nad neobnoveným Panelem.
6. Restore DB: do izolované databáze importuj správný dump. User/grants obnov bezpečně a ověř schema.
7. Server Manager: obnov přesnou kompatibilní verzi aplikace a branding, dependencies, public root a permissions.
8. Secure .env: obnov původní chráněnou konfiguraci včetně application key; NEGENERUJ nový klíč. Ověř dešifrování na testovací instanci.
9. Volumes: obnov /var/lib/pterodactyl/volumes a mapu serverů; game DB konzistence musí odpovídat datům.
10. Wings: rozhodni náhradu původní identity nebo registrovaný nový node. Obnov config bezpečně a uprav jen doložené host/síťové rozdíly. Nespouštěj dvě kopie stejného PROD.
11. NPM: obnov data/certs se správnou verzí, Docker sítě a dosažitelné upstreamy. Cert keys mají secure původ.
12. Staff: obnov schválený commit/image, .env a secret-free Cookbook. Zkontroluj callback doménu a allowlist.
13. Public Status: spusť oddělenou public-status službu bez admin/Cookbook rout.
14. DNS: až po předběžném testu přepni A/AAAA na skutečnou novou IP; zohledni TTL.
15. TLS: ověř certifikáty všech domén a renewal. Veřejné HTTPS netestuj s -k.
16. Game servers: nejdřív izolovaný test, poté každé PROD start/stop a klientské připojení.
17. txAdmin: ověř port/projekt, login a websocket; zachovej správný artifact/monitor.
18. Public services: staff/status/panel přes správné proxy hosty. Anonymous docsUI není odemčené, AI read-only funguje.
19. Monitoring: připoj skutečné status targety a ověř měření; UNKNOWN bez zdroje není důvod vymyslet ONLINE.
20. Final checklist: vlastník přijme obnovu, ukončete údržbu, vytvořte novou offsite zálohu a zapište postmortem.

## Ověřovací příkazy
~~~bash
systemctl --failed
systemctl is-active mariadb redis-server php8.3-fpm nginx pteroq wings
docker compose ps
ss -ltnp
ss -lunp
curl -I https://panel.diamondcrew.net
curl -I https://staff.diamondcrew.net
curl https://status.diamondcrew.net/api/public/status
~~~

## Rollback a podmínky zastavení
Pokud obnovovací bod neprojde testem, nepřepínej DNS a nespouštěj produkční zápisy. Vrať poslední ověřenou konzistentní sadu nebo předej chybějící backup/secret vlastníku. Starou databázi nepřepisuj novými pokusy bez uchování kopie.

## Související návody
[Full control plane](../02-dia-nodes/full-control-plane.md)
[Fresh Panel install](../03-server-manager-installation/fresh-install.md)
[Wings install](../04-wings/install.md)
[Required backups](required-backups.md)
[Acceptance](final-checklist.md)
