# DiamondCrew Staff Center 1.3.0 — integration candidate

Central SSO now exchanges opaque single-use browser tickets for Ed25519 assertions bound to audience, state, PKCE and the verified Staff session. Targets receive only public verification keys and distinct service credentials. Revoked/expired Staff sessions cannot redeem pending grants. Staff OAuth remains on Staff; Image Service uses its own central-SSO adapter, explicit local access list, native secure session and CSRF enforcement.

The launcher activates the verified Server Controller and Prismatic DEV destinations, keeps unavailable txAdmin/Image management destinations non-interactive, and permits Proxy activation through a runtime flag. Full DiamondCrew Interactive branding remains responsive. Shared server-side status adds configured web probes and safe public projection. Missing game data remains UNKNOWN; unrelated services cannot mark the infrastructure host ONLINE.

Request budgets are isolated by authenticated service or trusted source IP. Invalid credentials cannot spend valid client redemption quotas. TRUST_PROXY_CIDRS accepts explicit IP/CIDR peers only, defaults empty, and requires proxy header sanitization. Secrets/private keys stay outside Git and image layers in restrictive read-only runtime mounts.

## Validation

Local Node tests cover Staff→Image signed interoperability, forgery/expiry/replay/state/PKCE/authorization, session and CSRF controls, bounded rate counters and trusted-proxy spoof refusal, media operations and public-data projection. Browser tests cover launcher/mobile, public status, Cookbook access and Image media operations against real local APIs with mocked identity/broker upstreams. TypeScript, all three production Vite bundles and Cookbook metadata/link checks are required. Windows validation uses Vite's runner loader because sandboxed esbuild cannot traverse ancestor directories; the dev URL-denial test runs with dependency prebundling disabled, with application auth and filesystem-denial checks intact. Docker/live-service gates remain separate.

## Deployment boundaries

Proxy Manager 1.0.0 is deployed. Controller 1.2 is a candidate with native PAM validation passing; websocket/browser validation is pending. Staff 1.3.0 has not passed its production Docker gate or been tagged/released by this change. The existing Image CDN and /uploads/ URL structure remain in place; no migration or verified new production management is claimed. Production game STATUS_TARGETS is empty and no Pterodactyl API credential is configured, so game status remains UNKNOWN.

This branch changes no dependency versions, game data, CDN storage, DNS or native service accounts. New authentication state is single-process and revoked on restart. Global logout of already established target sessions is not implemented. Review deployment/rollback procedures in SSO.md, IMAGE-SSO.md and LAUNCHER-STATUS.md before acceptance.
