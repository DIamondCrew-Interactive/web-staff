---
title: "Záloha NPM"
category: 07-nginx-proxy-manager
categoryTitle: "Nginx Proxy Manager"
order: 151
audience: ["admin","ai"]
tags: ["backup"]
---

# Záloha NPM

## K čemu slouží

Zálohuj databázi/data společně s certifikáty.

## Kde a jak běží

nginx-proxy-manager_app_1 na DIA-01, porty 80/443 a admin 81; připojení do diamondcrew-proxy.

## Postup

1. Zálohuj databázi/data společně s certifikáty
2. Ulož image tag a Compose
3. Citlivé části patří do šifrovaného offsite úložiště

## Ověření výsledku

Testovací NPM načte hosty a certifikáty, záloha není pouze prázdný adresář.

## Související návody

[Kategorie a navazující návody](index.md)
