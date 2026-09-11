---
title: "Vytvoření Docker služby"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 247
audience: ["ai","admin"]
tags: ["create-docker-service","runbook","AI"]
---

# Vytvoření Docker služby

## Cíl
Spuštění aplikace s kontrolou dostupnosti za NPM.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Podrobný návod](../08-web-hosting/docker-app.md)
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
Ověř runtime/start/health, připoj shared síť a používej Docker DNS hostname, ne ephemeral IP.
Proveď konkrétní kroky z části „Nejdřív si přečti“, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## Ověření výsledku
Opakuj funkční test popsaný v části „Nejdřív si přečti“, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.
