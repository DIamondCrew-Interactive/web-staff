---
title: "Obnova ztraceného DIA-01"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 253
audience: ["ai","admin"]
tags: ["disaster-recovery","runbook","AI"]
---

# Obnova ztraceného DIA-01

## Cíl
Obnova z ověřených podkladů uložených mimo server.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Podrobný návod](../21-disaster-recovery/dia-01-lost.md)
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
Nejdřív potvrď rozsah ztráty a dostupné zálohy/secrets. Obnovuj vrstvy v dokumentovaném pořadí, přepni DNS až po testu.
Proveď konkrétní kroky z části „Nejdřív si přečti“, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## Ověření výsledku
Opakuj funkční test popsaný v části „Nejdřív si přečti“, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.
