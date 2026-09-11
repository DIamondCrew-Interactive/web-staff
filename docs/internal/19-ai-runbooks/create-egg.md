---
title: "Vytvoření Eggu"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 240
audience: ["ai","admin"]
tags: ["create-egg","runbook","AI"]
---

# Vytvoření Eggu

## Cíl
Vytvoření opakovaně použitelného a otestovaného herního Eggu.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Podrobný návod](../18-server-manager-user-guide/nests-eggs/create-egg-from-scratch.md)
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
Ověř official install, Linux/runtime, ports, stop a persistence; vytvoř DEV Egg a lifecycle test.
Proveď konkrétní kroky z části „Nejdřív si přečti“, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## Ověření výsledku
Opakuj funkční test popsaný v části „Nejdřív si přečti“, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.
