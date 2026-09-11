---
title: "Create a Paper server end to end"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 264
audience: ["user","admin","ai"]
tags: ["Paper","Minecraft","Java","plugins"]
---

# Create a Paper server end to end

## WHERE
Admin → Servers → Create New. Bez administrátorského oprávnění požádej správce; další běžné operace budeš dělat v klientském Server UI.

## WHAT / WHY
Paper je Minecraft server pro pluginy, ne Forge mod loader. Node DIA-01 je příklad existujícího hostu. Nest Minecraft → Egg Paper musí v Panelu skutečně existovat a být ověřený. Jestli ne, použij import schváleného Eggu, nikoliv náhodný internetový script.

## Procedure
1. Urči Minecraft/Paper verzi a v oficiální Paper dokumentaci ověř odpovídající Java. Tento návod nepředepisuje neověřenou jednu Java verzi všem release.
2. Admin → Nodes → DIA-01 → Allocations: zjisti volnou allocation. 25565 je běžná konvence, nikoliv potvrzení volnosti.
3. Zadej název, popis a Owner. CPU100 % znamená kapacitu jednoho jádra, ne celý node. CPU pinning nech prázdný, pokud ho správce výslovně neplánuje.
4. RAM je v MiB, 1 GiB =1024 MiB. Nech prostor JVM native paměti nad heapem. Disk přiděl s rezervou pro růst světa a pluginy; konečné limity stanov podle kapacity hostu a požadavků, ne vymyšlenou univerzální hodnotou.
5. Vyber ověřený image s kompatibilní Java a nastav Egg startup variables pro danou verzi/JAR podle popisů v UI. Před instalací nic tajného nevkládej do popisu.
6. Vytvoř server a sleduj install log. V Console proveď první start. EULA si provozovatel musí přečíst a oprávněně přijmout; automatický souhlas není součástí tohoto návodu.
7. Ověř vznik světa a připojení klienta správné verze. Potom korektně zastav a znovu spusť: data musí zůstat.
8. Pluginy přidávej jednotlivě do plugins až po čistém úspěšném startu a záloze. Ověř kompatibilitu a oprávnění, nepoužívej neověřený hot reload místo restartu.
9. Server → Backups → Create Backup; restore otestuj na samostatné instanci.

## Update / rollback
Zálohuj svět/config/plugins, ověř novou Java/Paper/plugin kombinaci na DEV a až potom měň PROD. Upgrade může nevratně převést svět; rollback znamená odpovídající starou app i zálohu světa, ne pouze výměnu JAR.

## VERIFY
Install/start/stop/restart, klientské připojení, uložení světa, plugin load a restore test jsou úspěšné.

## TROUBLESHOOTING
UnsupportedClassVersionError → Java mismatch. OOM → heap/celkový Memory limit. Failed to bind → allocation/startup konflikt. EULA chyba → oprávněné rozhodnutí provozovatele. Neexistující JAR → installer nebo proměnná názvu souboru.

## Related pages
[Official Paper getting started](https://docs.papermc.io/paper/getting-started/)
[Create server fields](../servers/create-server.md)
[Java version](java-version.md)
[Backup/restore](backup-restore.md)
