---
title: "Create a web root"
category: 08-web-hosting
categoryTitle: "Web hosting"
order: 158
audience: ["admin","ai"]
tags: ["new-web-root"]
---

# Create a web root

## Purpose

Pro example.pmrp.cz vytvoř /var/www/example.pmrp.cz. Výsledek musí být ověřený před předáním do provozu.

## Audience

Administrátor a AI agent s oprávněním k dané změně.

## Architecture

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Prerequisites

Potvrď cílový host, používanou verzi a aktuální konfiguraci. Před zápisem měj obnovitelnou zálohu a schválené servisní okno.

## Configuration / procedure

1. Pro example.pmrp.cz vytvoř /var/www/example.pmrp.cz
2. Nahraj jen schválené veřejné soubory
3. Nastav adresáře 755 a soubory 644

~~~bash
sudo mkdir -p /var/www/example.pmrp.cz
sudo chown -R www-data:www-data /var/www/example.pmrp.cz
sudo find /var/www/example.pmrp.cz -type d -exec chmod 755 {} \;
sudo find /var/www/example.pmrp.cz -type f -exec chmod 644 {} \;
~~~



## Verification

www-data čte index, ostatní nedostávají write.

## Update / rollback

Zapiš změněné soubory/verze. Při neúspěšném ověření vrať konkrétní změnu z předem připravené zálohy a zopakuj stejný test. Pokud update změnil databázové schema, samotný downgrade binárky nestačí; vrať kompatibilní kombinaci aplikace a dat.

## Troubleshooting

Při rozporu inventáře a zjištěného stavu zastav změnu. Odděl problém konfigurace, procesu a sítě. Diagnostické výstupy před sdílením zbav credentials, cookies a osobních dat.

## Related pages

[Kategorie a navazující návody](index.md)
