---
title: "Instalace Cockpitu"
category: 10-cockpit
categoryTitle: "Cockpit"
order: 177
audience: ["admin","ai"]
tags: ["install"]
---

# Instalace Cockpitu

## K čemu slouží

Na Debian 12 nainstaluj cockpit.

## Kde a jak běží

Host management mimo Panel: admin.diamondcrew.net, 9090, cockpit.socket.

## Postup

1. Na Debian 12 nainstaluj cockpit
2. Aktivuj cockpit.socket
3. Omez admin přístup
4. Reverzní proxy nakonfiguruj podle Cockpit origins požadavků

~~~bash
sudo apt-get update
sudo apt-get install cockpit
sudo systemctl enable --now cockpit.socket
systemctl status cockpit.socket --no-pager
curl -kI https://127.0.0.1:9090
~~~

## Ověření výsledku

Lokální HTTPS odpovídá a socket je active.

## Související návody

[Kategorie a navazující návody](index.md)
