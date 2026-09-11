---
title: "Nesprávná struktura souborů FiveM"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 225
audience: ["admin","ai"]
tags: ["fivem-startup","troubleshooting","diagnostics"]
---

# Nesprávná struktura souborů FiveM

## Příznaky
/home/container/FXServer: No such file or directory.

## Pravděpodobné příčiny
Old ./FXServer command persisted after new alpine artifact.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
test -f alpine/opt/cfx-server/FXServer
ls alpine/opt/cfx-server
~~~

## Oprava
U existujícího serveru otevři skutečný Admin Startup, porovnej ho s ověřeným Eggem a uprav pro alpine/opt/cfx-server/FXServer podle runtime launcheru. Pouhý Egg import nemusí příkaz přepsat. Zachovej původní command pro rollback.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
FiveM start, txAdmin i game connection. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Test existing-server upgrade, ne jen fresh install. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
