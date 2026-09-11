---
title: "Aktualizace a rollback Cockpitu"
category: 10-cockpit
categoryTitle: "Cockpit"
order: 179
audience: ["admin","ai"]
tags: ["update"]
---

# Aktualizace a rollback Cockpitu

## K čemu slouží

Zálohuj config a zapiš verzi balíčku.

## Kde a jak běží

Host management mimo Panel: admin.diamondcrew.net, 9090, cockpit.socket.

## Postup

1. Zálohuj config a zapiš verzi balíčku
2. Aktualizuj přes apt po kontrole candidate
3. Ověř socket/login
4. Při regresi vrať ověřený balíček nebo systémový snapshot

~~~bash
apt-cache policy cockpit
systemctl status cockpit.socket --no-pager
~~~

## Ověření výsledku

SSH recovery cesta zůstává k dispozici.

## Související návody

[Kategorie a navazující návody](index.md)
