---
title: "Minimální potřebná oprávnění"
category: 17-security
categoryTitle: "Zabezpečení"
order: 212
audience: ["admin","ai"]
tags: ["least-privilege"]
---

# Minimální potřebná oprávnění

## K čemu slouží

Odděl admin/client účty.

## Kde a jak běží

Nejnižší nutná oprávnění, ochrana secrets a veřejně bezpečný read-only Cookbook.

## Postup

1. Odděl admin/client účty
2. Read-only monitoring token dej jen backendu
3. Subuser permissions přizpůsob úkolu
4. NPM veřejné staff stránce nepřidává povinnou Basic Auth

## Ověření výsledku

Účet neumí více, než jeho úloha vyžaduje.

## Související návody

[Kategorie a navazující návody](index.md)
