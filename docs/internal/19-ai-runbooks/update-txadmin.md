---
title: "Aktualizace vlastního txAdminu"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 249
audience: ["ai","admin"]
tags: ["update-txadmin","runbook","AI"]
---

# Aktualizace vlastního txAdminu

## Cíl
Výměna monitoru bez ztráty herních dat.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Podrobný návod](../06-txadmin/update.md)
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
Ověř release/hash, zálohuj stock/current monitor a data, testuj DEV a skutečný startup existující instance.
Proveď konkrétní kroky z části „Nejdřív si přečti“, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## Ověření výsledku
Opakuj funkční test popsaný v části „Nejdřív si přečti“, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.
