---
title: "Nový DIA node: kompletní správa"
category: 02-dia-nodes
categoryTitle: "Servery DIA"
order: 266
audience: ["admin","ai"]
tags: []
---

# Nový DIA node: kompletní správa

## Účel a použití
Administrátor připravuje nový stroj bez kopírování aktivní identity původního nodu. Nový stroj obsahuje také Panel a webovou control plane.

## Kde a jak běží
DiamondCrew naming DIA-XX je logický název; hostname zvol jednoznačně, stávající DIA-01 používá dc-node01. FQDN, veřejná IP a konečné subnety nového stroje jsou `<configure-for-target-environment>`.

## Předpoklady a záloha
Recovery konzole, sudo, schválené DNS, kapacita a dostupné offsite zálohy. Pokud nahrazuješ produkci, uchovej předchozí host a neprováděj souběžné zápisy stejné herní instance.

## Instalace
1. Nainstaluj Debian12; ověř OS, architekturu a disky. Použij [Základní nastavení Debianu](debian.md).
2. Vytvoř osobní sudo/SSH účet a otestuj druhou session před zpřísněním sshd: [SSH/sudo](ssh-sudo.md).
3. Proveď [konkrétní Docker install](../14-docker/install.md), ověř Engine a Compose.
4. Zmapuj hostové i Docker sítě. Vyber volný subnet; nekopíruj slepě 172.19.0.0/16. Nastav [firewall](firewall.md) se zachováním managementu.
5. Dokonči [fresh Panel install](../03-server-manager-installation/fresh-install.md): MariaDB, Redis, PHP8.3, app/env/key, migrations, pteroq, scheduler a local nginx.
6. Zprovozni [NPM](../07-nginx-proxy-manager/compose.md), DNS a TLS a ověř přihlášení Panelu.
7. Dokonči [Wings installation](../04-wings/install.md), vygenerovanou konfiguraci přenes bezpečně, nastav síť, systemd, SFTP a proxy model. Vzdálený node potřebuje vlastní dosažitelný HTTPS endpoint; nepředpokládej, že NPM na jiném hostu automaticky vidí jeho localhost.
8. Přidej ověřené allocations a odpovídající firewall. Vytvoř testovací DEV game server; otestuj instalaci, konzoli, start/stop, SFTP a klientské připojení.
9. Nainstaluj [Staff Center](../11-staff-center/deployment.md) a [Veřejný status](../12-public-status/architecture.md); nastav Discord a shared proxy síť. Nezaměň veřejný login webu s oprávněním Panelu.
10. Nastav zálohy mimo host a [restore test](../15-backups/restore-test.md). Teprve po ověření přesuň produkční hry/směrování.

## Ověření výsledku
~~~bash
hostnamectl
docker version
docker compose version
systemctl status wings --no-pager
ss -ltnp
ss -lunp
~~~
Vyžaduj úspěšné skutečné herní připojení a test persistence, ne jen zelenou ikonu nodu.

## Aktualizace, rollback a řešení problémů
Aktualizuj vrstvy odděleně v servisním okně. Při selhání vrať směrování na původní ověřený host a kompatibilní data; nedovol dvě PROD kopie. Při nejasném identity/subnet konfliktu zastav migraci a nejprve inspectuj. [Recovery](../21-disaster-recovery/dia-01-lost.md).
