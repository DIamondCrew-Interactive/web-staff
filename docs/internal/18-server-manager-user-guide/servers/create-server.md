---
title: "Create a server: every field explained"
category: 18-server-manager-user-guide
categoryTitle: "Server Manager user guides"
order: 262
audience: ["user","admin","ai"]
tags: ["create","server","limits","CPU","memory"]
---

# Create a server: every field explained

## WHERE
Otevři https://panel.diamondcrew.net → Admin → Servers → Create New. Běžný klient nemusí tuto část vidět; v tom případě zadá požadavek správci a nepřebírá jeho účet.

## WHAT / WHY
### Server Name
Srozumitelné jméno včetně projektu/PROD/DEV; nemění automaticky doménu.

### Description
Účel a vlastník bez secrets.

### Owner
Existující odpovědný účet; ne automaticky hlavní admin.

### Node
Skutečný dostupný node, např. DIA-01, podle kapacity a location.

### Default Allocation
Ověřená volná primární IP/port dvojice z nodu; ne odhadnuté číslo.

### Additional Allocation
Další porty jen pokud je hra/konzole potřebuje; musí být přiřazené tomuto serveru.

### CPU Limit
CPU100 % odpovídá kapacitě jednoho jádra, 200 % dvěma; limit není rezervace jader. Nula může znamenat unlimited: potvrď politiku a UI cílové verze.

### CPU Pinning
Volitelné omezení na konkrétní host CPU indices; bez měření a inventáře ponech prázdné.

### Memory
MiB limit, 1 GiB = 1024 MiB. Zahrnuje celý proces/container, ne jen Java heap.

### Swap
Schválená politika swapu; není náhrada fyzické RAM. Význam 0/-1 ověř v cílovém UI před použitím.

### Disk
Limit serverových dat v MiB; počítej svět, resources a růst logů.

### Block IO
Relativní priorita diskových operací, ne pevná rychlost MB/s; běžně ponech schválený default.

### OOM Killer
Bez důvodu nevypínej ochranu; místo toho oprav spotřebu/limit. OOM může ukončit proces.

### Database Limit
Kolik game DB smí server založit; samotný limit nevytváří DB Host.

### Allocation Limit
Kolik dalších allocations lze serveru nabídnout; porty musí existovat na nodu.

### Backup Limit
Limit záloh podle storage/retence; naplánovaný backup musí mít dostupný slot.

### Nest
Skupina, např. Minecraft nebo Grand Theft Auto V.

### Egg
Konkrétní ověřený recept, např. Paper nebo DiamondCrew FiveM txAdmin.

### Docker Image
Ověřený runtime z nabídky Eggu; ne náhodný image tag.

### Startup Variables
Validované nastavení instalace/runtime; secrets pouze v chráněném UI, nikoliv v Cookbooku.

## Procedure
1. Nejdřív potvrď projekt, prostředí, vlastníka, hru/verzi a kapacitu.
2. Admin → Nodes → DIA-01 → Allocations: najdi skutečně volnou allocation. Další administrativní port není automaticky přidělený.
3. Vyplň pole výše a zkontroluj Nest/Egg/image jako jednu kompatibilní sadu.
4. Zahaj vytvoření a sleduj install log. Dokončený installer není důkaz funkčního startu.
5. V Console proveď první start, pak stop a restart. Ve Files zkontroluj persistence; Network musí odpovídat allocations.
6. Proveď klientské připojení a vytvoř první ověřený backup.

## VERIFY
Server není ve stavu failed/installing, používá správný runtime/port, klient se připojí a po restartu zůstala data. Nesmí omylem vzniknout PROD s DEV vlastnictvím nebo sdílenou DB.

## TROUBLESHOOTING
Chybějící allocation = zjisti nodové porty a limit, nevymýšlej volné číslo. OOM = ověř Memory a skutečné využití. Exit127 = executable, working directory nebo libraries. Překlep Eggu neopravuj reinstallem bez zálohy. Vrať původní config, pokud se měnila existující instance.

## Related pages
[Network allocations](network-allocations.md)
[Paper tutorial](../minecraft/create-paper.md)
[Egg concepts](../nests-eggs/nest-vs-egg.md)
