---
title: "Use SFTP"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 50
audience: ["user","admin","ai"]
tags: ["servers","sftp"]
---

# Use SFTP

## Purpose

Server. Výsledek musí být ověřený před předáním do provozu.

## Audience

Uživatel Server Manageru; krok označený Admin vyžaduje správce. Není potřeba znát Linux pro běžnou klientskou část.

## Architecture

Panel klient spravuje vlastní server; vytvoření serveru, nodu a Eggu je práce administrátora.

## Prerequisites

Vyber správný server a ověř svá oprávnění. U běžícího PROD domluv údržbu a připrav zálohu před změnou.

## WHERE / WHAT / WHY

1. Server
2. Settings/SFTP Details
3. Do SFTP klienta zadej host, port a username z panelu
4. Přihlas se vlastním oprávněným účtem
5. Nenahrávej přes zapisující produkční data



## Verification

Testovací soubor lze nahrát, přečíst a odstranit; SCP a FTP nejsou totéž co SFTP.

## Update / rollback

Před změnou ulož původní nastavení a vytvoř backup souvisejících dat. Pokud ověření selže, zastav nové zápisy a vrať poslední kompatibilní nastavení nebo ověřenou zálohu; obnovu přes živá data potvrzuje vlastník serveru.

## Troubleshooting

Chybějící položka UI obvykle znamená nedostatečné oprávnění nebo limit serveru. Předej správci název serveru, čas a redigovanou chybu. Neopakuj destruktivní operaci naslepo.

## Related pages

[Kategorie a navazující návody](../index.md)
