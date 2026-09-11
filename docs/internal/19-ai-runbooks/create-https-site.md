---
title: "Vytvoření HTTPS webu"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 245
audience: ["ai","admin"]
tags: ["create-https-site","runbook","AI"]
---

# Vytvoření HTTPS webu

## Cíl
Zpřístupnění veřejné aplikace přes HTTPS s platným certifikátem.

## Nejdřív si přečti
[Společná pravidla: vstupy, záloha, rollback a podmínky zastavení](general-rules.md)

[Podrobný návod](../09-dns-https/https.md)
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
DNS → backend → NPM host/scheme/port → TLS → Force SSL → test bez -k.
Proveď konkrétní kroky z části „Nejdřív si přečti“, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## Ověření výsledku
Opakuj funkční test popsaný v části „Nejdřív si přečti“, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.
