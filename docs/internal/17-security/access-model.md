---
title: "Přihlášení do rozhraní a přístup AI"
category: 17-security
categoryTitle: "Zabezpečení"
order: 211
audience: ["admin","ai"]
tags: ["access-model"]
---

# Přihlášení do rozhraní a přístup AI

## K čemu slouží

Discord allowlist chrání Cookbook UI a staff docs API.

## Kde a jak běží

Nejnižší nutná oprávnění, ochrana secrets a veřejně bezpečný read-only Cookbook.

## Postup

1. Discord allowlist chrání Cookbook UI a staff docs API
2. AI API je unlisted public read-only
3. Robots/noindex nejsou security boundary
4. Schválený root musí být bezpečný i při nalezení URL

## Ověření výsledku

Anonymous AI čte jen Cookbook, nemá zápis ani libovolný filesystem.

## Související návody

[Kategorie a navazující návody](index.md)
