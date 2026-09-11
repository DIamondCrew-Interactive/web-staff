---
title: "Vytvoření kořenové složky webu"
category: 08-web-hosting
categoryTitle: "Hostování webů"
order: 158
audience: ["admin","ai"]
tags: ["new-web-root"]
---

# Vytvoření kořenové složky webu

## K čemu slouží

Pro example.pmrp.cz vytvoř /var/www/example.pmrp.cz.

## Kde a jak běží

Statické soubory s nginx, lokální aplikace nebo Docker aplikace za NPM.

## Postup

1. Pro example.pmrp.cz vytvoř /var/www/example.pmrp.cz
2. Nahraj jen schválené veřejné soubory
3. Nastav adresáře 755 a soubory 644

~~~bash
sudo mkdir -p /var/www/example.pmrp.cz
sudo chown -R www-data:www-data /var/www/example.pmrp.cz
sudo find /var/www/example.pmrp.cz -type d -exec chmod 755 {} \;
sudo find /var/www/example.pmrp.cz -type f -exec chmod 644 {} \;
~~~

## Ověření výsledku

www-data čte index, ostatní nedostávají write.

## Související návody

[Kategorie a navazující návody](index.md)
