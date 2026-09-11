---
title: "New DIA node: game node only"
category: 02-dia-nodes
categoryTitle: "DIA nodes"
order: 265
audience: ["admin","ai"]
tags: []
---

# New DIA node: game node only

## Purpose / Audience
Administrátor připravuje nový stroj bez kopírování aktivní identity původního nodu. Panel zůstává na existující control plane.

## Architecture
DiamondCrew naming DIA-XX je logický název; hostname zvol jednoznačně, stávající DIA-01 používá dc-node01. FQDN, veřejná IP a konečné subnety nového stroje jsou `<configure-for-target-environment>`.

## Prerequisites / Backup
Recovery konzole, sudo, schválené DNS, kapacita a dostupné offsite zálohy. Pokud nahrazuješ produkci, uchovej předchozí host a neprováděj souběžné zápisy stejné herní instance.

## Installation
1. Nainstaluj Debian12; ověř OS, architekturu a disky. Použij [Debian baseline](debian.md).
2. Vytvoř osobní sudo/SSH účet a otestuj druhou session před zpřísněním sshd: [SSH/sudo](ssh-sudo.md).
3. Proveď [konkrétní Docker install](../14-docker/install.md), ověř Engine a Compose.
4. Zmapuj hostové i Docker sítě. Vyber volný subnet; nekopíruj slepě 172.19.0.0/16. Nastav [firewall](firewall.md) se zachováním managementu.
5. V existujícím Panelu přidej novou Location podle potřeby a nový node s vlastní identitou a FQDN.
7. Dokonči [Wings installation](../04-wings/install.md), vygenerovanou konfiguraci přenes bezpečně, nastav síť, systemd, SFTP a proxy model. Vzdálený node potřebuje vlastní dosažitelný HTTPS endpoint; nepředpokládej, že NPM na jiném hostu automaticky vidí jeho localhost.
8. Přidej ověřené allocations a odpovídající firewall. Vytvoř testovací DEV game server; otestuj instalaci, konzoli, start/stop, SFTP a klientské připojení.
9. Do schváleného status systému přidej skutečné targety bez vystavení privátních adres.
10. Nastav zálohy mimo host a [restore test](../15-backups/restore-test.md). Teprve po ověření přesuň produkční hry/směrování.

## Verification
~~~bash
hostnamectl
docker version
docker compose version
systemctl status wings --no-pager
ss -ltnp
ss -lunp
~~~
Vyžaduj úspěšné skutečné herní připojení a test persistence, ne jen zelenou ikonu nodu.

## Update / Rollback / Troubleshooting
Aktualizuj vrstvy odděleně v servisním okně. Při selhání vrať směrování na původní ověřený host a kompatibilní data; nedovol dvě PROD kopie. Při nejasném identity/subnet konfliktu zastav migraci a nejprve inspectuj. [Recovery](../21-disaster-recovery/dia-01-lost.md).
