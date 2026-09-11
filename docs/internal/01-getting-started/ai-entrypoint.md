---
title: "DiamondCrew Cookbook — vstup pro AI"
category: 01-getting-started
categoryTitle: "Začínáme"
order: 256
audience: ["user","admin","ai"]
tags: ["AI","entry","inventory","architecture"]
---

# DiamondCrew Cookbook — vstup pro AI

Provozní dokumentace infrastruktury DiamondCrew. Veřejné API umožňuje pouze čtení a není uvedené v navigaci. Dokumentace neobsahuje tajné údaje a sama o sobě nedává oprávnění měnit servery.

## Před změnou
1. Urči cílový stroj a službu.
2. Přečti příslušné návody.
3. Rozliš pravidla DiamondCrew od požadavků softwaru.
4. Nevymýšlej porty, přístupové údaje, App ID ani adresy ke stažení.
5. Ověř příkazy pro konkrétní cílovou verzi.
6. Použij existující otestované součásti DiamondCrew.
7. Před destruktivní změnou připrav zálohu a rollback.
8. Po změně proveď ověření uvedené v návodu.
9. Nezveřejňuj tajné údaje v logu, chatu, commitu ani dokumentaci.

## Přehled architektury
Inventář dodaný provozovatelem: DIA-01, hostname dc-node01, Debian 12, veřejná IP 51.254.46.124. Panel 1.15.1, PHP 8.3, databáze MariaDB panel, Redis, lokální nginx a pteroq běží vedle Wings 1.13.3, Dockeru, NPM, Cockpitu, FiveM, Minecraftu, Staff Centeru a veřejného statusu. Před změnou ověř skutečný stav; inventář není živý monitoring.

## Přehled služeb
Panel: `/var/www/pterodactyl`. Wings: binární soubor `/usr/local/bin/wings`, konfigurace `/etc/pterodactyl/config.yml`, služba `wings.service`, data `/var/lib/pterodactyl/volumes`. NPM: kontejner `nginx-proxy-manager_app_1`. Cockpit: `cockpit.socket`. Zdrojové soubory Staff Centeru: `/opt/diamondcrew-staffcenter`.

## Přehled domén
panel.diamondcrew.net = Server Manager. dia-01.diamondcrew.net = Wings. proxy.diamondcrew.net = NPM. admin.diamondcrew.net = Cockpit. staff.diamondcrew.net = Staff Center. status.diamondcrew.net = veřejný status. tx.pmrp.cz / tx-dev.pmrp.cz = Prismatic PROD/DEV. tx.dcrp.cz / tx-dev.dcrp.cz = DiamondCrew PROD/DEV.

## Přehled portů
Pravidla DiamondCrew, nikoli obecný požadavek softwaru: DCRP herní porty 30120/30121, txAdmin 33020/33021; Prismatic herní porty 30130/30131, txAdmin 33030/33031. Minecraft 25565 a další ověřené porty. Wings interní HTTP 8443 za NPM 443, SFTP 2022. Cockpit 9090. NPM 80/443 a správa 81. Staff Center a status interně 3000. Port lokálního nginx upstreamu zjisti z konfigurace.

## Přehled sítí
Zaznamenané sítě: bridge `172.17.0.0/16`, nginx-proxy-manager_default `172.18.0.0/16`, pterodactyl0 `172.19.0.0/16`. NPM je také v síti diamondcrew-proxy; její rozsah ověř. Rozsah 172.19 nepřebírej na nový stroj bez kontroly kolizí. Chybu `Pool overlaps` řeš cíleně, nemaž kvůli ní všechny sítě.

## GitHub repozitáře
- https://github.com/DIamondCrew-Interactive/web-servermanager
- https://github.com/DIamondCrew-Interactive/fivem-txadmindc
- https://github.com/DIamondCrew-Interactive/web-staff

## Obsah příručky a postupy pro AI
API připojuje úplný seznam návodů. Začni [architekturou](architecture.md), [ověřováním zdrojů](sources.md), [postupy pro AI](../19-ai-runbooks/index.md) a konkrétním návodem k úkolu. Neznámé hodnoty označuje `<configure-for-target-environment>`. Produkční tajné údaje patří pouze do zabezpečené konfigurace a záloh.
