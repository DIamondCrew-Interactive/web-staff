---
title: "Minecraft troubleshooting"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 71
audience: ["user","admin","ai"]
tags: ["minecraft","troubleshooting"]
---

# Minecraft troubleshooting

## Purpose

Zkontroluj EULA, Java, JAR, plugin/mod kompatibilitu a RAM. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Zkontroluj EULA, Java, JAR, plugin/mod kompatibilitu a RAM
2. Při změnách testuj jednu příčinu
3. Neodstraňuj svět jako první opravu



## Verification

Reprodukovaná chyba zmizela a herní data zůstala konzistentní.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
