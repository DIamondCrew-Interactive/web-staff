---
title: "Současné CDN: ověřené a chybějící údaje"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 2
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Současné CDN: ověřené a chybějící údaje

## Ověřený rozsah
Existující https://img.dcrp.cz stále provozuje původní CDN. Používané veřejné odkazy mají mimo jiné prefix /uploads/; tento prefix a všechny existující cesty musí zůstat zachované. Nová Node Image Service není na této doméně prokázaným managementem a migrace neproběhla. Staff karta zůstává neklikatelné IN PROGRESS. HTTP200 z veřejného rootu nepotvrzuje existenci nové správy.

## Neveřejný inventář
Adresa hostu, SSH přístup, webroot, mounty a credential materiál jsou v provozním inventáři správce. Veřejný Cookbook tyto údaje nepotřebuje. Neodvozuj filesystem z HTTP odpovědi a nepřesměrovávej doménu na jiný uzel bez ověřené migrace.

## Další kroky
Potvrď všechny používané URL, objem dat a zapisující klienty. Před změnou zachovej zálohu a checksumy, otestuj staging včetně /uploads/ cest a proveď postup z [migrace](migration.md). Nová správa používá central Staff SSO s odděleným Image allowlistem; původní CDN přihlášení se automaticky nepřenáší.
