---
title: "SSH a sudo"
category: 02-dia-nodes
categoryTitle: "Servery DIA"
order: 121
audience: ["admin","ai"]
tags: ["ssh-sudo"]
---

# SSH a sudo

## K čemu slouží

Vytvoř osobní ne-root účet a sudo oprávnění.

## Kde a jak běží

Debian 12, dc-node01 / DIA-01 a nové game/control-plane nody.

## Postup

1. Vytvoř osobní ne-root účet a sudo oprávnění
2. Přenes pouze veřejný SSH klíč
3. V druhé session ověř přístup před změnou SSH politiky
4. Privátní klíč patří pouze držiteli

~~~bash
sudo adduser dcops
sudo usermod -aG sudo dcops
sudo sshd -t
~~~

## Ověření výsledku

Nový uživatel se přihlásí a sudo -v uspěje bez ztráty původní recovery cesty.

## Související návody

[Kategorie a navazující návody](index.md)
