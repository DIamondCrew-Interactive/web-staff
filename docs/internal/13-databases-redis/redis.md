---
title: "Správa Redis"
category: 13-databases-redis
categoryTitle: "Databáze a Redis"
order: 189
audience: ["admin","ai"]
tags: ["redis"]
---

# Správa Redis

## K čemu slouží

Redis používá Panel pro cache/queue.

## Kde a jak běží

MariaDB databáze panel a oddělené game databáze; Redis není náhradou trvalé DB.

## Postup

1. Redis používá Panel pro cache/queue
2. Zkontroluj lokální listener, paměť a případné ACL
3. Nepoužívej flushall jako univerzální opravu

~~~bash
redis-cli ping
systemctl status redis-server --no-pager
~~~

## Ověření výsledku

redis-cli ping odpoví a queue worker dokončí test task.

## Související návody

[Kategorie a navazující návody](index.md)
