---
title: "Diagnostika Wings"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 252
audience: ["ai","admin"]
tags: ["diagnose-wings","runbook","AI"]
---

# Diagnostika Wings

## Cíl
Obnova připojení nodu podle zjištěné příčiny.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Podrobný návod](../20-troubleshooting/wings-offline.md)
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
Prověř službu, Docker, FQDN/TLS/proxy, identity a IPAM. Tokeny nevypisuj.
Proveď konkrétní kroky z části „Nejdřív si přečti“, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## Ověření výsledku
Opakuj funkční test popsaný v části „Nejdřív si přečti“, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.
