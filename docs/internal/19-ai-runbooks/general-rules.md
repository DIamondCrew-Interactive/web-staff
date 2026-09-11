---
title: "Provozní pravidla pro AI"
category: 19-ai-runbooks
categoryTitle: "Postupy pro AI"
order: 236
audience: ["ai","admin"]
tags: ["general-rules","runbook","AI"]
---

# Provozní pravidla pro AI

## Cíl
Určení cíle a provedení pouze schválené operace.

## Potřebné údaje
Cílový stroj/služba a prostředí, vlastník požadavku, konkrétní verze, dostupná oprávnění, požadovaný dopad a servisní okno. Secrets získávej jen schváleným kanálem, nikoliv z Cookbooku.

## Nejdřív si přečti
[Podrobný návod](../01-getting-started/ai-entrypoint.md)
[Inventář DiamondCrew](../01-getting-started/architecture.md)
[Pravidla pro porty](../01-getting-started/port-map.md)

## Co je potřeba ověřit
Nevymýšlej allocation, Steam App ID, query port, Docker image, latest verzi, download URL nebo credentials. Rozliš DiamondCrew konvenci od požadavku softwaru.

## Kontrola před změnou
Proveď pouze relevantní read-only inspekci cíle: service status, docker ps/network inspect, ss TCP/UDP a Panel allocations. Porovnej nález s inventářem.

~~~bash
docker ps
docker network ls
ss -ltnp
ss -lunp
~~~

## Záloha
Před zápisem identifikuj konkrétní data a config, obnovovací bod a předchozí release. Secrets mají oddělenou secure zálohu. Bez dostupného restore plánu neprováděj destruktivní změnu.

## Postup
Identifikuj stroj/službu, přečti konvence a ověř současný stav. Bez ověřených vstupů nepouštěj změnu.
Proveď konkrétní kroky z části „Nejdřív si přečti“, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## Ověření výsledku
Opakuj funkční test popsaný v části „Nejdřív si přečti“, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.

## Rollback
Vrať uchovanou předchozí konfiguraci/release a podle potřeby kompatibilní data. Zastav nové zápisy před obnovou. Ověř stejný test po návratu.

## Kdy zastavit postup
Chybí ověřený vstup, checksum, dostupná záloha, oprávnění nebo bezpečný maintenance window; objeví se nečekané existující PROD prostředí nebo síťová kolize.

## Kdy předat problém správci
Změna zasahuje cizí data, vyžaduje nové tajné údaje, obnovu ztracené DB nebo změnu veřejného směrování mimo schválený rozsah. Předej redigovaný nález, ne secrets.
