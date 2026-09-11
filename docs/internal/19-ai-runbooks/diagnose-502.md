---
title: "Diagnostika chyby 502"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 251
audience: ["ai","admin"]
tags: ["diagnose-502","runbook","AI"]
---

# Diagnostika chyby 502

## Cíl
Zjištění, kde selhává spojení mezi proxy a cílovou službou.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Podrobný návod](../20-troubleshooting/npm-502.md)
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
Ověř přímý upstream ze správné sítě, scheme/host/port, proces a log; neřeš TLS, pokud handshake již funguje.
Proveď konkrétní kroky z části „Nejdřív si přečti“, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## Ověření výsledku
Opakuj funkční test popsaný v části „Nejdřív si přečti“, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.
