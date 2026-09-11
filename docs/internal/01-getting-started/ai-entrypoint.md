---
title: "DiamondCrew Infrastructure Cookbook — AI Entry Point"
category: 01-getting-started
categoryTitle: "Getting started"
order: 256
audience: ["user","admin","ai"]
tags: ["AI","entry","inventory","architecture"]
---

# DiamondCrew Infrastructure Cookbook — AI Entry Point

You are reading the operational documentation for DiamondCrew infrastructure. This is unlisted, read-only, secret-free documentation, not authorization to change a server.

## Before making changes
1. Determine which machine/service the request concerns.
2. Read the relevant Cookbook pages.
3. Distinguish DiamondCrew conventions from software requirements.
4. Never invent ports, credentials, App IDs, download URLs or secrets.
5. Verify version-sensitive commands against the documented target version.
6. Prefer existing tested DiamondCrew components.
7. Before destructive changes, identify backup and rollback.
8. After changes, execute documented verification.
9. Never expose secrets in logs, chat, commits or documentation.

## Architecture Summary
Owner-provided inventory: DIA-01, hostname dc-node01, Debian12, public IP51.254.46.124. Panel1.15.1 / PHP8.3 / MariaDB panel / Redis / local nginx / pteroq run alongside Wings1.13.3, Docker, NPM, Cockpit, FiveM, Minecraft, Staff and Public Status. This inventory is not a live health reading; inspect before changing it.

## Service Map
Panel: /var/www/pterodactyl. Wings binary: /usr/local/bin/wings, config: /etc/pterodactyl/config.yml, service wings.service, data /var/lib/pterodactyl/volumes. NPM container nginx-proxy-manager_app_1. Cockpit cockpit.socket. Staff source /opt/diamondcrew-staffcenter.

## Domain Map
panel.diamondcrew.net = Server Manager. dia-01.diamondcrew.net = Wings. proxy.diamondcrew.net = NPM. admin.diamondcrew.net = Cockpit. staff.diamondcrew.net = Staff. status.diamondcrew.net = public status. tx.pmrp.cz / tx-dev.pmrp.cz = Prismatic PROD/DEV. tx.dcrp.cz / tx-dev.dcrp.cz = DiamondCrew PROD/DEV.

## Port Map
DIAMONDCREW CONVENTION, not a general software requirement: DCRP game30120/30121, txAdmin33020/33021; Prismatic game30130/30131, txAdmin33030/33031. Minecraft25565 and verified additional allocations. Wings internal HTTP8443 behind NPM443; SFTP2022. Cockpit9090. NPM80/443/admin81. Staff/Status internal3000. Inspect local nginx upstream port; do not invent it.

## Network Map
Current bridge172.17.0.0/16, nginx-proxy-manager_default172.18.0.0/16, pterodactyl0172.19.0.0/16. NPM is also on diamondcrew-proxy; inspect that network's subnet. Never blindly copy172.19 to a new machine. Pool overlaps is a known incident, not a reason to prune all networks.

## GitHub repositories
- https://github.com/DIamondCrew-Interactive/web-servermanager
- https://github.com/DIamondCrew-Interactive/fivem-txadmindc
- https://github.com/DIamondCrew-Interactive/web-staff

## Cookbook index and AI runbooks
The API-generated entry appends the complete index. Start with [architecture](architecture.md), [source accuracy](sources.md), [AI runbooks](../19-ai-runbooks/index.md) and the relevant detailed guide. Unknown values are `<configure-for-target-environment>`. Production secrets exist only in secure configuration/backups, never here.
