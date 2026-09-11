# Central Staff SSO broker

SSO is disabled by default. Discord OAuth and existing Staff session/CSRF behavior remain available independently. Enable only on the Staff process; public Status and Image Service do not mount this broker.

## Contract

Audience IDs are `servercontroller`, `proxymanager`, `image-service`. Production start and callback origins are respectively `https://admin.diamondcrew.net`, `https://proxy.diamondcrew.net`, `https://img.dcrp.cz`; paths are `/auth/sso/start` and `/auth/sso/callback`. No arbitrary callback is accepted. A bare `/sso/<audience>` redirects to the target start route so that the target first establishes a browser-bound transaction.

Target start generates random state and PKCE verifier, stores them in its secure browser-bound server transaction, and redirects to `GET /sso/<audience>?state=...&code_challenge=...`. State is base64url 43–128 characters; challenge is base64url SHA-256 of verifier (43 characters). Staff obtains an existing verified Discord session or performs its existing Discord OAuth flow with a validated internal continuation. Per-client allowed IDs are checked. Browser receives only an opaque 32-byte base64url ticket plus unchanged state; ticket expires after 45 seconds.

The target backend calls `POST /sso/api/redeem` with `Authorization: Bearer <distinct service credential>` and JSON `{ticket,audience,state,code_verifier}`. It receives `{assertion,token_type:"DCI-SSO",expires_in:45}`. Assertion is Ed25519 compact JWT with protected `alg=EdDSA`, `typ=JWT`, configured `kid`; claims `iss=https://staff.diamondcrew.net`, `aud`, `sub` (numeric Discord ID encoded as a string), `iat`, `exp`, `jti`, `state`. JWT lifespan is 45 seconds from redemption. Target MUST pin issuer, exact audience, algorithm and allowed kid, verify signature, enforce iat/exp and maximum 45-second lifespan, match state/browser transaction and consume jti/transaction once before creating a native authorized session. Use only public keys at targets. Never accept a JWT directly from browser URL in this contract.

Ticket lookup/validation/deletion is synchronous and atomic in the single Staff process. Tickets are hashed in memory and bind state, audience, PKCE and the exact live Staff session. Logout, session replacement or expiry prevents redemption; allowlist removal also prevents issuance/redemption. Already established target sessions remain governed by target policy (there is no back-channel global logout). Restart revokes all Staff sessions and unredeemed tickets. Do not run multiple Staff workers/replicas until shared atomic session/grant storage is implemented.

## Private configuration and Docker

Set `SSO_ENABLED=true`, `SSO_CLIENTS_FILE` (absolute private JSON path), `SSO_PRIVATE_KEY_FILE` (absolute private Ed25519 PKCS8 PEM path), `SSO_KEY_ID` (unique base64url-safe label), and a strong existing `SESSION_SECRET`. Issuer must be the exact value above. Enabled invalid configuration fails startup. Files must be regular non-symlink files, at most 64 KiB, owned by root or the service UID and with no group/other permission bits on Unix. On Windows enforce equivalent ACLs administratively; Unix mode tests do not apply there.

Client JSON is an array, for example (replace placeholder before enabling):

```json
[{"id":"servercontroller","callbackUrl":"https://admin.diamondcrew.net/auth/sso/callback","startUrl":"https://admin.diamondcrew.net/auth/sso/start","clientSecret":"REPLACE_WITH_INDEPENDENT_RANDOM_32_BYTE_BASE64URL_SECRET","allowedDiscordIds":["REPLACE_WITH_AUTHORIZED_DISCORD_ID"]}]
```

Use a different randomly generated >=32-byte secret for every service. An empty allowlist grants nobody access. Server validates distinct secrets. No real secret/key should enter Git, image build context, environment dump, browser response or logs.

Base Compose remains disabled and needs no key volume. The optional `docker-compose.sso.yml` mounts a pre-existing dedicated host credential directory read-only only into Staff. Set `SSO_CREDENTIAL_DIRECTORY` to its absolute host path, directory mode 0700 and files 0600/0400 with ownership matching container node UID 1000. Root-owned 0600 files cannot be read by that unprivileged container; materialize runtime copies for UID 1000 instead. The mount refuses automatic host directory creation. Private key is never copied into the image. Retain encrypted backups outside the repository. Reverse proxies must disable/redact SSO query strings and authorization headers in access/error logs; the application does not log tickets or assertions.

## Existing production runtime

Staff maintenance uses `/etc/diamondcrew-staffcenter/runtime.compose.json`, project `diamondcrew-staffcenter`, project directory `/opt/diamondcrew-staffcenter` and its existing `.env` context. Base Compose and optional overlays describe new installation; applying them over the resolved runtime removes live SSO configuration. Back up runtime bytes, inspect, old image IDs and commit; update only image IDs and preserve every environment value, credential mount and network. Resolved environment does not automatically follow `.env` edits. See README.md for the production runbook.

Proxy uses `/etc/diamondcrew-interactive/npm-runtime.compose.json` with its existing project identity and directory; preserve its custom image, credential/data mounts and networks. Its tracked Compose still describes version 1.0. Controller maps to existing Unix UID 1001, distinct from container node UID 1000 and Proxy application user ID 1.

## Rotation

Generate a new Ed25519 pair with a new kid. First distribute only the new public key alongside the old public key to each target. Set a documented absolute removal deadline for the old key, bounded to the rollout interval plus 45 seconds and the targets' explicit clock skew allowance. Then atomically replace Staff's private key and kid and restart the single Staff process (pending sign-ins restart). After the last old assertion can expire, remove the old public key at every target. Do not retain old keys indefinitely. Compromise requires immediate old-key rejection and target session revocation per target policy; expiry alone does not revoke already established target sessions.

## Verification and current limits

Local Node tests exercise real Express issuance/redemption using mocked Discord HTTP responses: signature/tamper verification, wrong client credentials/audience, ticket forgery, expiration, state/PKCE mismatch, concurrent replay, logout, allowlist revocation and disabled routes. Private-file/type validation tests run locally; Unix permissions are asserted only when tests run on Unix. This is not production Discord/native Controller/Proxy E2E, Docker deployment or reverse-proxy logging verification.

Image Service now implements a separate central-SSO relying party with `/auth/sso/start`, `/auth/sso/callback`, public-key verification and native server sessions. Its explicit local allowlist and CSRF checks protect `/api/media`; it no longer uses standalone Discord OAuth. See [Image SSO](IMAGE-SSO.md) for configuration, access policy and local integration tests. The existing public CDN management deployment has not been verified: keep its launcher disabled until that deployment and real login are accepted.

## Request budgets

Redemption authenticates the service credential before charging its separate 600/minute audience budget. Failed client authentication has a separate 60/minute per-source-IP budget and cannot consume legitimate service quota. Ticket issuance and Image starts are 120/minute per source IP; Staff Discord starts are 60/minute per source IP. Counters expire after 60 seconds and hold at most 10,000 IP entries (20 configured-service entries for redemption); existing buckets remain usable at capacity. Grant/session storage bounds remain separate, and a full issuance store does not prevent redeeming an existing grant.

IP selection respects Express `req.ip` and its configured trusted-proxy boundary; raw forwarding headers are never trusted directly. With no trusted-proxy configuration, the socket peer is used. Behind NPM, that can group visitors under the proxy address; configure only the actual trusted proxy peer/hops before depending on distinct public-client quotas. Do not enable blanket trust of arbitrary X-Forwarded-For headers. The tests explicitly configure loopback as a trusted test proxy and also prove untrusted spoofed forwarding headers cannot evade the quota.

`TRUST_PROXY_CIDRS` accepts only comma-separated IP addresses or nonzero CIDRs (no names, hop counts or blanket trust). Empty is the default. Compose forwards it to the application. Set only the actual reverse-proxy peer, preferably its exact /32 or /128; update this setting if container recreation changes that IP. The trusted proxy must overwrite the inbound X-Forwarded-For chain with verified client information. Unknown socket peers cannot supply trusted forwarding headers. Never put production proxy addresses or credentials into Git.
