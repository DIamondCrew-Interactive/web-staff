---
title: "Veřejná URL txAdminu"
category: 06-txadmin
categoryTitle: "txAdmin"
order: 131
audience: ["admin","ai"]
tags: ["reverse-proxy"]
---

# Veřejná URL txAdminu

## K čemu slouží

NPM tx-dev.pmrp.cz.

## Kde a jak běží

DiamondCrew monitor nad FXServer artifactem; NPM publikuje konzoli odděleně od hry.

## Postup

1. NPM tx-dev.pmrp.cz
2. host reachable allocation 33031
3. txAdmin
4. Zapni WebSockets a TLS, TXHOST_TXA_URL použije veřejné HTTPS URL

## Ověření výsledku

Login i websocket session fungují bez 502 a mixed content.

## Související návody

[Kategorie a navazující návody](index.md)
