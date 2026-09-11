# Staff launcher and shared status

Staff is a launcher: Server Manager, Server Controller, Service Status and Prismatic DEV are enabled destinations. The three unresolvable txAdmin production/DEV names remain non-clickable IN PROGRESS. Image management remains non-clickable until the new management deployment is verified; HTTP200 from the existing image delivery root does not prove management exists. Proxy is enabled only by runtime `LAUNCHER_PROXY_ENABLED=true` after deployment acceptance. Enabling a card means its launch destination is configured, not that an HTTP probe currently reports ONLINE. Server Controller replaces the former duplicate Cockpit card. Existing Discord login and internal documentation controls are unchanged.

The server exposes sanitized launcher metadata at `/api/launcher` only on Staff. No VITE build secret/config is required. External enabled links open a new tab with noopener/noreferrer; disabled items are non-interactive articles. Full DiamondCrew Interactive branding and DEV badges remain readable on mobile.

## Shared status sources

`STATUS_TARGETS` remains the existing game/host adapter configuration, with Pterodactyl API and optional FiveM players.json sources. `PTERODACTYL_CLIENT_API_KEY` stays server-only. Do not infer a mapping from the count of containers: set real per-game pterodactylId and/or FiveM origins only after inventory. Missing sources and failed/unauthorized game API readings return UNKNOWN, with no fabricated player counts. Pterodactyl starting/stopping returns UNKNOWN rather than ONLINE. DIA-01 requires its own explicit healthUrl and never inherits a game's process or FiveM state.

New `STATUS_WEB_TARGETS` is server-only JSON, default `[]`. Accepted IDs are staff-web, status-web, manager-web, controller-web, proxy-web, image-web, prismatic-dev-web. Each entry has `{id,healthUrl,maintenance?}`. For example, after confirming each destination:

```dotenv
LAUNCHER_PROXY_ENABLED=false
STATUS_WEB_TARGETS=[{"id":"staff-web","healthUrl":"https://staff.diamondcrew.net"},{"id":"status-web","healthUrl":"https://status.diamondcrew.net"},{"id":"manager-web","healthUrl":"https://panel.diamondcrew.net"},{"id":"controller-web","healthUrl":"https://admin.diamondcrew.net"},{"id":"proxy-web","healthUrl":"https://proxy.diamondcrew.net"},{"id":"image-web","healthUrl":"https://img.dcrp.cz"},{"id":"prismatic-dev-web","healthUrl":"https://tx-dev.pmrp.cz"}]
```

Apply the same STATUS_TARGETS/STATUS_WEB_TARGETS and maintenance settings to Staff and Public Status containers. docker-compose.yml forwards these variables without embedding them in frontend bundles. All probes run server-side with five-second timeouts, no redirect following, and a coalesced 15-second snapshot cache; browsers refresh every 30 seconds. Web HTTP2xx yields ONLINE, configured health failure yields OFFLINE, no configured probe yields UNKNOWN and configured maintenance yields MAINTENANCE. A web root availability check does not verify login, native management operations, game processes or the host.

Public Status projects only safe results (name, enum status, numeric response time/player count when sourced). Controller, Proxy and DEV web rows are filtered from the public variant; development game rows are also filtered. It never returns probe URLs, private IPs, API IDs/tokens, upstream payloads or container names. Public incident/maintenance text is intentionally operator-authored public content: do not place private details there. DIA-01 is labeled Infrastructure on Public Status. The Staff variant shows the same source readings plus internal-purpose rows, without exposing probe coordinates.

Node tests cover missing/unreachable sources, transitional game state, host independence, schema validation, public privacy and card switching. Browser tests check real rendered disabled cards, external destinations, status rendering, full brand and responsive layouts from320px. Network probes in tests use controlled mock responses; no live service-health assertion is made by test fixtures.
