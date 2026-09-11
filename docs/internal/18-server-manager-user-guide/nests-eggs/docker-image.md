---
title: "Choose an Egg image"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 91
audience: ["user","admin","ai"]
tags: ["nests-eggs","docker-image"]
---

# Choose an Egg image

## Purpose

Vyber důvěryhodný image s přesným runtime/architekturou. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Vyber důvěryhodný image s přesným runtime/architekturou
2. Ověř jeho dostupnost v registry
3. Nepoužívej náhodný latest image jako doloženou kompatibilitu



## Verification

Executable má potřebné knihovny a běží pod očekávaným uživatelem.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
