---
title: "Install Server Manager"
category: 19-ai-runbooks
categoryTitle: "AI runbooks"
order: 242
audience: ["ai","admin"]
tags: ["install-server-manager","runbook","AI"]
---

# Install Server Manager

## GOAL
Fresh Debian to Panel and DiamondCrew branding.

## REQUIRED CONTEXT
Cílový stroj/služba a prostředí, vlastník požadavku, konkrétní verze, dostupná oprávnění, požadovaný dopad a servisní okno. Secrets získávej jen schváleným kanálem, nikoliv z Cookbooku.

## READ FIRST
[Relevantní end-to-end návod](../03-server-manager-installation/fresh-install.md)
[DiamondCrew inventory](../01-getting-started/architecture.md)
[Port conventions](../01-getting-started/port-map.md)

## DO NOT ASSUME
Nevymýšlej allocation, Steam App ID, query port, Docker image, latest verzi, download URL nebo credentials. Rozliš DiamondCrew konvenci od požadavku softwaru.

## PRE-CHECKS
Proveď pouze relevantní read-only inspekci cíle: service status, docker ps/network inspect, ss TCP/UDP a Panel allocations. Porovnej nález s inventářem.

~~~bash
docker ps
docker network ls
ss -ltnp
ss -lunp
~~~

## BACKUP
Před zápisem identifikuj konkrétní data a config, obnovovací bod a předchozí release. Secrets mají oddělenou secure zálohu. Bez dostupného restore plánu neprováděj destruktivní změnu.

## PROCEDURE
Nejprve vyluč existující DB/env. Použij ověřený release1.15.1 a konkrétní fresh install kroky včetně workeru/scheduleru.
Proveď konkrétní kroky z READ FIRST, zapisuj skutečné výsledky a nedělej souběžně nesouvisející změny.

## VERIFICATION
Opakuj funkční test popsaný v READ FIRST, ověř správné prostředí, zachování dat a nepřítomnost credential leaků. Samotný exit0 nebo existující container není akceptační test.

## ROLLBACK
Vrať uchovanou předchozí konfiguraci/release a podle potřeby kompatibilní data. Zastav nové zápisy před obnovou. Ověř stejný test po návratu.

## STOP CONDITIONS
Chybí ověřený vstup, checksum, dostupná záloha, oprávnění nebo bezpečný maintenance window; objeví se nečekané existující PROD prostředí nebo síťová kolize.

## ESCALATE WHEN
Změna zasahuje cizí data, vyžaduje nové tajné údaje, obnovu ztracené DB nebo změnu veřejného směrování mimo schválený rozsah. Předej redigovaný nález, ne secrets.
