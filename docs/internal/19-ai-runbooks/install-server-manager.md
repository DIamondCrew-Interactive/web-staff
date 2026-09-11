---
title: "Instalace Server Manageru"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 242
audience: ["ai","admin"]
tags: ["install-server-manager","runbook","AI"]
---

# Instalace Server Manageru

## Cíl
Instalace panelu se vzhledem DiamondCrew na čistý Debian.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Podrobný návod](../03-server-manager-installation/fresh-install.md)
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
Nejprve vyluč existující DB/env. Použij ověřený release1.15.1 a konkrétní fresh install kroky včetně workeru/scheduleru.
Proveď konkrétní kroky z části „Nejdřív si přečti“, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## Ověření výsledku
Opakuj funkční test popsaný v části „Nejdřív si přečti“, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.
