---
title: "Nastavení Discord OAuth"
category: 11-staff-center
categoryTitle: "Staff Center"
order: 181
audience: ["admin","ai"]
tags: ["discord-oauth"]
---

# Nastavení Discord OAuth

## K čemu slouží

V Developer Portal vytvoř aplikaci.

## Kde a jak běží

Veřejný rozcestník; Discord povoluje Cookbook UI. Express na 3000 za NPM.

## Postup

1. V Developer Portal vytvoř aplikaci
2. Zaregistruj https://staff.diamondcrew.net/auth/discord/callback
3. Client ID/Secret a allowlist vlož do serverového env
4. SESSION_SECRET generuj bezpečně

## Ověření výsledku

Povolený účet otevře UI, nepovolený vidí jen No internal access a logout ruší session.

## Související návody

[Kategorie a navazující návody](index.md)
