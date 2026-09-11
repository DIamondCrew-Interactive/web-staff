---
title: "Primární a další porty (Allocations)"
category: 18-server-manager-user-guide
categoryTitle: "Používání Server Manageru"
order: 263
audience: ["user","admin","ai"]
tags: ["allocation","TCP","UDP","ports"]
---

# Primární a další porty (Allocations)

## Kde to najdeš
Admin → Nodes → DIA-01 → Allocations. Administrátor vidí porty nodu a jejich přiřazení. Klient Server → Network vidí porty přidělené konkrétní instanci.

## Význam jednotlivých polí
Primary Allocation je výchozí IP/port instance. Additional Allocation je další přiřazený port pro query, druhý listener nebo txAdmin. Limit allocations není automatické přidělení portů. TCP je spojovaný přenos, UDP datagramový; firewall a aplikace musí podporovat protokol požadovaný danou službou.

## Postup
1. Identifikuj projekt a prostředí. Prismatic DEV má podle DiamondCrew convention game30131 a txAdmin33031. Není to univerzální požadavek FiveM.
2. Ověř v nodu, že allocation existuje a není cizímu serveru přidělená. Pokud neexistuje, správce nejprve ověří host listenery a vytvoří ji.
3. V administraci konkrétního serveru přiřaď primary a potřebné additional allocations.
4. V Startup nastav shodné game/admin proměnné. Restart domluv kvůli hráčům.
5. U NPM použij HTTP console allocation33031; herní TCP/UDP30131 není HTTP Proxy Host.

## Ověření správcem
~~~bash
ss -ltnp
ss -lunp
docker ps --format 'table {{.Names}}\t{{.Ports}}'
~~~
Ověř i Panel allocation ownership, protože zastavený server nemusí mít aktivní listener. Prázdný ss výpis není důkaz nepřiřazeného portu.

## Ověření a řešení problémů
Klient se připojí k hernímu portu a console používá správný admin port. Address already in use znamená konflikt, ne výzvu použít náhodné číslo. Při rollbacku vrať startup i původní allocation a firewall; nepřiděluj již používaný port jinému serveru.

## Související návody
[Create server](create-server.md)
[Port convention](../../01-getting-started/port-map.md)
