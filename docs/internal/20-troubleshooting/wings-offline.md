---
title: "Node offline in Panel"
category: 20-troubleshooting
categoryTitle: "Troubleshooting"
order: 220
audience: ["admin","ai"]
tags: ["wings-offline","troubleshooting","diagnostics"]
---

# Node offline in Panel

## Symptoms
Panel cannot communicate with node.

## Likely Causes
Daemon stopped, FQDN/TLS/proxy mismatch, invalid identity.

## Diagnostics
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
systemctl status wings docker --no-pager
curl -I https://dia-01.diamondcrew.net
~~~

## Fix
Postupuj od procesu po veřejné HTTPS. Ověř behind-proxy model a správnou nodovou identitu, nevypisuj config.yml do chatu.

## Backup / Rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Verification
Node online, console a files. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevention
Ověření TLS/proxy po změně certifikátu. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Related pages
[Infrastructure overview](../01-getting-started/architecture.md)
[Disaster recovery](../21-disaster-recovery/dia-01-lost.md)
