---
title: "Vytvoření DIA nodu"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 241
audience: ["ai","admin"]
tags: ["create-dia-node","runbook","AI"]
---

# Vytvoření DIA nodu

## Cíl
Přidání nodu pro herní servery nebo pro kompletní správu.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Podrobný návod](../02-dia-nodes/game-node-only.md)
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
Rozhodni model nodu a jeho identitu, proveď Debian/Docker/Wings workflow. Full plane navíc používá příslušný plný návod.
Proveď konkrétní kroky z části „Nejdřív si přečti“, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## Ověření výsledku
Opakuj funkční test popsaný v části „Nejdřív si přečti“, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.
