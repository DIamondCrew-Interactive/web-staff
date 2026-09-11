# Image Service central sign-in

The Image Service management UI now starts `/auth/sso/start` and uses the Staff broker audience `image-service`, callback `https://img.dcrp.cz/auth/sso/callback`. Discord OAuth credentials belong only to Staff. Image Service has no Discord routes or OAuth exchange; remove its old Discord environment variables when deploying this change.

Public image URLs, filesystem storage and media operations are unchanged. With no `IMAGE_SSO_CONFIG_FILE`, public serving and health remain available while management login is disabled. An explicitly configured malformed private file fails startup rather than silently weakening authentication. Validate configuration before switching the running service.

The private JSON file has exactly these fields (replace placeholders):

```json
{
  "redeem_secret": "REPLACE_WITH_DISTINCT_RANDOM_32_BYTE_BASE64URL_CREDENTIAL",
  "verification_keys": {"dci-20260911": "REPLACE_WITH_ED25519_PUBLIC_PEM"},
  "allowed_ids": ["REPLACE_WITH_AUTHORIZED_DISCORD_ID"]
}
```

`allowed_ids` explicitly maps each numeric Discord ID string to Image Service manager access (read inventory and all existing media mutations). No admin role is inferred from Discord, Staff membership or a supplied JWT role claim. An empty list grants nobody access. Access must also be allowed in Staff's separate image-service client configuration. There is no read-only role in the existing management UI. Configuration changes require process restart, which revokes sessions.

Only public Ed25519 keys are accepted in `verification_keys` (maximum four). Pin each approved kid. No URL-supplied JWK, arbitrary issuer, HMAC or unsigned JWT is accepted. Rotate by distributing the new public key before Staff switches signing key, then remove the old key by a fixed deadline after the final 45-second old assertion plus explicit clock allowance. Image accepts at most five seconds future iat but never accepts an expired exp. Do not leave old keys indefinitely. See `SSO.md` for central rotation and broker details.

Local native sessions are opaque random 32-byte IDs in HttpOnly Secure SameSite=Lax `__Host-dci_image_session` cookies, last one hour, and use independent CSRF tokens for writes/logout. Development cookies are non-Secure only when NODE_ENV is not production. Callback transactions are browser-cookie bound, contain random state and a server-held PKCE verifier, expire after five minutes and are synchronously consumed before network redemption. A local jti cache adds replay rejection through assertion expiry. Restart clears sessions, transactions and cache, so a pre-restart callback cannot redeem. This is a single-process implementation; do not scale multiple workers/replicas without shared atomic session/transaction storage. Staff logout does not invalidate already established Image sessions; local logout/restart and session expiry do.

The private config must be an absolute regular non-symlink file owned by root or service UID, permissions 0600/0400 on Unix. The optional `docker-compose.image-sso.yml` mounts an existing dedicated host credential directory read-only at `/run/dci-image-sso`; set `IMAGE_SSO_CREDENTIAL_DIRECTORY`, directory mode 0700 and file mode0600 owned by UID1000 (the container node user). Keep its sole config.json outside source/build context. The base image Compose does not require secret files and retains the existing media volume unchanged. Unix permission enforcement cannot be tested by Windows mode bits; configure equivalent ACLs for local Windows credentials.

Disable/redact SSO query strings and Authorization headers in reverse-proxy logs. Runtime does not log assertion/ticket/credential values. Frontend gets only safe session status and CSRF, no broker credentials or JWT. `/auth/discord` is unavailable.

Local tests cover the actual Staff broker signing and Image callback/session creation together (Discord API is mocked), plus signature/algorithm/kid/issuer/audience/time/state/subject restrictions, concurrent callback replay, repeated jti, transaction expiry, CSRF, local logout, and existing media operation regression tests. This does not certify production DNS/proxy/cookies, live Discord login or CDN deployment. Inventory the chosen CDN host before deploying; this change performs no storage migration or deployment.

Image sign-in start requests have a 120/minute per-source-IP budget with expiring bounded counters, independent of other client IPs. IP identity follows Express's configured trusted-proxy boundary, not raw X-Forwarded-For headers. Without trusted proxy configuration the socket peer is used, so visitors behind a single reverse proxy share its bucket; deployment must explicitly configure its trusted peer to distinguish client addresses. See SSO.md Request budgets.

`TRUST_PROXY_CIDRS` accepts only comma-separated IP addresses or nonzero CIDRs (no names, hop counts or blanket trust). Empty is the default. Compose forwards it to the application. Set only the actual reverse-proxy peer, preferably its exact /32 or /128; update this setting if container recreation changes that IP. The trusted proxy must overwrite the inbound X-Forwarded-For chain with verified client information. Unknown socket peers cannot supply trusted forwarding headers. Never put production proxy addresses or credentials into Git.
