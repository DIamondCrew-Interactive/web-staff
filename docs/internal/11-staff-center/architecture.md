---
title: "Architektura Staff Centeru"
category: 11-staff-center
categoryTitle: "Staff Center"
order: 180
audience: ["admin","ai"]
tags: ["architecture"]
---

# Architektura Staff Centeru

## K čemu slouží

Veřejný web funguje bez Discordu.

## Kde a jak běží

Veřejný 4×2 rozcestník; Discord povoluje Cookbook UI na samostatné /docs. Homepage Cookbook nevykresluje. Header Documentation je viditelný jen allowlisted účtu. Express na 3000 za NPM. Image Service management zůstává IN PROGRESS do přijetí deploymentu; veřejná distribuce médií na původní CDN pokračuje. Controller je aktivní, Proxy se aktivuje runtime flagem po přijetí nasazení.

## Postup

1. Veřejný web funguje bez Discordu
2. Backendové sessions autorizují Cookbook UI
3. Unlisted AI API čte stejný secret-free root bez loginu
4. NPM směřuje na staffcenter:3000

## Ověření výsledku

Anonymous homepage 200, protected docs 401, AI read endpoint 200.

## Související návody

[Kategorie a navazující návody](index.md)

## Image Service
[Image Service / CDN](../22-image-service-cdn/index.md) má vlastní management a deployment.
