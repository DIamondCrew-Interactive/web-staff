---
title: "Nasazení vzhledu Server Manageru"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 250
audience: ["ai","admin"]
tags: ["deploy-server-manager-reskin","runbook","AI"]
---

# Nasazení vzhledu Server Manageru

## Cíl
Použití ověřených souborů odpovídajícího brandingu.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Podrobný návod](../03-server-manager-installation/reskin-release.md)
[Inventář DiamondCrew](../01-getting-started/architecture.md)
[Pravidla pro porty](../01-getting-started/port-map.md)

## Kontrola před změnou
Proveď pouze relevantní read-only inspekci cíle: service status, docker ps/network inspect, ss TCP/UDP a Panel allocations. Porovnej nález s inventářem.

~~~bash
docker ps
docker network ls
ss -ltnp
ss -lunp
~~~

## Postup
Potvrď baseline1.15.1 a release asset/manifest. Zálohuj frontend, aplikuj konkrétní release a otestuj client/admin/login.
Proveď konkrétní kroky z části „Nejdřív si přečti“, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## Ověření výsledku
Opakuj funkční test popsaný v části „Nejdřív si přečti“, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.
