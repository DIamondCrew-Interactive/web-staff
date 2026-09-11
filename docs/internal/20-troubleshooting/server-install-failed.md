---
title: "Instalace hry selhala"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 223
audience: ["admin","ai"]
tags: ["server-install-failed","troubleshooting","diagnostics"]
---

# Instalace hry selhala

## Příznaky
Install log ends unsuccessfully.

## Pravděpodobné příčiny
Download failure, wrong asset, missing runtime, permissions or disk.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
df -h
docker ps -a
~~~

## Oprava
Zkontroluj první instalační chybu, ověř URL/digest a disk. Oprav Egg na DEV. Reinstall PROD teprve po záloze a znalosti dopadu.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
Čistý install/start/stop. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Versioned tested Egg. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
