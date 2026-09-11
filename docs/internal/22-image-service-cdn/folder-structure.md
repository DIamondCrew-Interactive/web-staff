---
title: "Safe folder hierarchy"
category: 22-image-service-cdn
categoryTitle: "Image Service / CDN"
order: 5
audience: [user, admin, ai]
tags: [images, cdn, media]
---

# Safe folder hierarchy

## Allowed names
ASCII a-z A-Z 0-9, tečka, podtržítko a pomlčka. Segment musí začínat písmenem nebo číslem. Maximálně 128 znaků/segment, 16 úrovní a 600 znaků/path. Dvojtečky, procenta, mezery, control chars, backslash, prázdné segmenty, '..', trailing tečka a Windows device names jsou odmítnuté.
## Hierarchy
Slash odděluje segmenty celé relativní cesty, ale není součástí jména. inventory/food je dvojice složek. /inventory/food je absolutní cesta a je odmítnutá. Symlinky nejsou dovolené nikde v media rootu.
## Legacy imports
Staré názvy s mezerami, diakritikou či rezervovanými prefixy vyžadují rozhodnutí o URL kompatibilitě. Nevymýšlej automatický rename bez mapování klientů. [Migration](migration.md).
