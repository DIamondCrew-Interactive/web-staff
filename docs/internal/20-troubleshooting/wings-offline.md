---
title: "Node je v panelu offline"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 220
audience: ["admin","ai"]
tags: ["wings-offline","troubleshooting","diagnostics"]
---

# Node je v panelu offline

## Příznaky
Panel cannot communicate with node.

## Pravděpodobné příčiny
Daemon stopped, FQDN/TLS/proxy mismatch, invalid identity.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl status wings docker --no-pager
curl -I https://dia-01.diamondcrew.net
~~~

## Oprava
Postupuj od procesu po veřejné HTTPS. Ověř behind-proxy model a správnou nodovou identitu, nevypisuj config.yml do chatu.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
Node online, console a files. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Ověření TLS/proxy po změně certifikátu. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
