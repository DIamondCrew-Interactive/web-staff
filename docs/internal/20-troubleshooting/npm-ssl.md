---
title: "Problém s certifikátem NPM"
category: 20-troubleshooting
categoryTitle: "Řešení problémů"
order: 228
audience: ["admin","ai"]
tags: ["npm-ssl","troubleshooting","diagnostics"]
---

# Problém s certifikátem NPM

## Příznaky
Browser distrusts certificate or renewal fails.

## Pravděpodobné příčiny
Wrong domain, expired cert, DNS/challenge failure.

## Diagnostika
Před změnou potvrď správný host/server a čas události. Příkazy jsou read-only, pokud není uvedeno jinak; logy před sdílením rediguj.

~~~bash
curl -I https://staff.diamondcrew.net
~~~

## Oprava
Zkontroluj cert domény, A/AAAA a challenge routing. Neřeš veřejný TLS vypnutím ověřování.

## Záloha a rollback
Uchovej související konfiguraci a konzistentní data před opravou. Pokud zásah selže, vrať pouze změněnou část z ověřené zálohy; při schema změně vrať kompatibilní aplikaci i DB. Nezaměň návrat DNS s obnovou dat.

## Ověření výsledku
HTTPS bez -k. Test musí reprodukovat původně selhávající operaci a potvrdit zachování dat.

## Prevence
Monitoring expiry/renewal. Zaznamenej skutečnou příčinu a výsledek testu, ne jen provedený restart.

## Související návody
[Infrastructure overview](../01-getting-started/architecture.md)
[Obnova po havárii](../21-disaster-recovery/dia-01-lost.md)
