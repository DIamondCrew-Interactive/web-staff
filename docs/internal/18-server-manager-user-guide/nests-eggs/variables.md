---
title: "Egg variables"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 94
audience: ["user","admin","ai"]
tags: ["nests-eggs","variables"]
---

# Egg variables

## Purpose

Každá proměnná má název, výchozí hodnotu, validační pravidla a visibility/editability. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Každá proměnná má název, výchozí hodnotu, validační pravidla a visibility/editability
2. Tajné hodnoty nedávej do exportovaného JSON
3. Runtime a build/install proměnné mají jiné použití



## Verification

Neplatný port či prázdná povinná hodnota je odmítnutá bez logování tajemství.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
