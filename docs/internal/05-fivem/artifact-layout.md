---
title: "Struktura Linux artifactu"
category: 05-fivem
categoryTitle: "FiveM"
order: 125
audience: ["admin","ai"]
tags: ["artifact-layout"]
---

# Struktura Linux artifactu

## K čemu slouží

FXServer executable je alpine/opt/cfx-server/FXServer.

## Kde a jak běží

Oddělené PROD/DEV instance; herní allocations a TXHOST konfigurace.

## Postup

1. FXServer executable je alpine/opt/cfx-server/FXServer
2. Monitor je alpine/opt/cfx-server/citizen/system_resources/monitor
3. Existující server může mít starý startup ./FXServer

~~~bash
test -f alpine/opt/cfx-server/FXServer
ls alpine/opt/cfx-server/citizen/system_resources/monitor
~~~

## Ověření výsledku

Start nehlásí /home/container/FXServer: No such file or directory.

## Související návody

[Kategorie a navazující návody](index.md)
