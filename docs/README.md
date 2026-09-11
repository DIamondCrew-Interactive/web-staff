# Cookbook authoring

`docs/internal/` obsahuje 327 schválených Markdownů ve 22 kategoriích. Název složky je historický: obsah je dostupný anonymně přes AI read-only API a je součástí veřejného repozitáře. Discord allowlist odemyká Staff UI, nikoliv důvěrnost tohoto obsahu.

Žádná hesla, API keys, APP_KEY, Discord secrets, FiveM license keys, DB hesla ani SSH privátní klíče. Používej placeholder `<configure-for-target-environment>` a bezpečné příklady. Uživatelský inventář odliš od software requirements. Nepřenášej sem neveřejné backupy/logy/env.

Každý soubor má UTF-8 frontmatter:

```yaml
---
title: "Název postupu"
category: 04-wings
categoryTitle: "Wings"
order: 20
audience: [admin, ai]
tags: [node, installation]
---
```

`category` odpovídá první složce, `categoryTitle` je volitelný. Audience podporuje user/admin/ai. Slug se odvodí z relativní cesty bez `.md`; volitelný explicitní slug musí být unikátní. Nové kategorie potřebují `index.md`. Udržuj pořadí, jednoznačné titulky, kompletní předpoklady, kroky, verification, rollback a troubleshooting; uváděj primární zdroje a kontext verzí.

Odkazy na jiné stránky používej relativně (`../04-wings/index.md`); kotvy odpovídají malým písmenům bez diakritiky, slova odděluje pomlčka. Obrázky a raw HTML čtečka nevykresluje. Code blocks označ jazykem a uzavři fence. Žádné symlinky ani odkazy ven z kořene. Maximum 512 KiB/stránka a 1500 stránek je záměrný limit loaderu.

Index, fulltext a UI vznikají automaticky z Markdownů. API načítá/cachuje validovaný obsah 30 sekund. Produkční docs jsou uvnitř image; jejich změna vyžaduje rebuild a recreate. Frontend neimportuje text dokumentů.

Před schválením spusť `npm run check:docs`, `npm test`, `npm run test:browser` a secret scan včetně nových souborů. Kontrola obsahu a provozních příkazů člověkem zůstává nutná; kontrola syntaxe Markdownu neověřuje skutečný stav hostu.

Přístupové routy, přesný deployment a rollback jsou v [README](../README.md).
