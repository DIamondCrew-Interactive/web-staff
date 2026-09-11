---
title: "Docker Engine on Debian 12"
category: 14-docker
categoryTitle: "Docker & networking"
order: 215
audience: ["admin","ai"]
tags: []
---

# Docker Engine on Debian 12

## Purpose
Připravit Docker Engine a Compose plugin na čistém Debianu, podle oficiálního apt repository postupu. Není to povel aktualizovat živý DIA-01 bez servisního okna.

## Audience
Admin a AI. Root/sudo a recovery konzole jsou předpoklad.

## Architecture
Hostový Docker provozuje NPM, Wings hry a weby. Docker group poskytuje prakticky root ekvivalent; nepřidávej do ní běžné hráče.

## Prerequisites
Ověř Debian 12, architekturu, disk a stávající balíčky. Konfliktní docker.io/containerd odstraň jen podle inventáře a oficiálního migračního postupu, ne naslepo na živém hostu.

## Installation
~~~bash
cat /etc/os-release
uname -m
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
architecture=$(dpkg --print-architecture)
codename=$(. /etc/os-release && printf '%s' "$VERSION_CODENAME")
printf 'Types: deb\nURIs: https://download.docker.com/linux/debian\nSuites: %s\nComponents: stable\nArchitectures: %s\nSigned-By: /etc/apt/keyrings/docker.asc\n' "$codename" "$architecture" | sudo tee /etc/apt/sources.list.d/docker.sources >/dev/null
sudo apt-get update
apt-cache policy docker-ce
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
~~~
Před potvrzením balíčků zaznamenej vybrané verze; nepřeznačuj je za univerzální latest.

## Configuration / networking
~~~bash
docker network ls
docker network inspect $(docker network ls -q) --format '{{.Name}} -> {{range .IPAM.Config}}{{.Subnet}}{{end}}'
~~~
Na novém hostu vyber volné subnety. 172.19.0.0/16 je současná DiamondCrew konfigurace pterodactyl0, ne povinnost Dockeru.

## Verification
~~~bash
sudo docker run --rm hello-world
docker version
docker compose version
~~~

## Backup / update / rollback
Uchovej service Compose, image digesty a konzistentní data před upgradem Dockeru. Reboot/daemon upgrade ovlivní všechny hry. Návrat balíčků musí odpovídat podporovanému storage formátu; při nejasnosti obnov systémový snapshot, ne náhodný starší daemon.

## Troubleshooting
Socket permission není důvod k chmod 777. Connection refused vede ke kontrole docker.service; pool overlap ke kontrole IPAM.

## Related pages
[Official Debian install](https://docs.docker.com/engine/install/debian/)
[Network map](../01-getting-started/network-map.md)
