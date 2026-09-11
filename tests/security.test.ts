import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, mkdir, writeFile, unlink, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createApp } from '../server/app.js';
import { config, readTargets, loginAvailable, type AppConfig } from '../server/config.js';
import { readStatus, type Fetcher } from '../server/adapters.js';
import { createMonitor } from '../server/monitoring.js';
import { services } from '../src/config/services.js';

const allowed = '111111111111111111', denied = '222222222222222222';
const settings = (): AppConfig => ({ ...config, production: false, targets: [], token: '', pterodactylUrl: '', maintenance: false, incidentTitle: '', discordClientId: '333333333333333333', discordClientSecret: 'test-only-discord-secret', discordRedirectUri: 'http://localhost:3000/auth/discord/callback', discordAllowedIds: new Set([allowed]) });
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
const discord: Fetcher = async (input, init) => {
  const url = String(input);
  if (url === 'https://discord.com/api/oauth2/token') {
    assert.equal(init?.method, 'POST');
    const body = new URLSearchParams(String(init?.body));
    assert.equal(body.get('grant_type'), 'authorization_code');
    assert.equal(body.get('client_secret'), 'test-only-discord-secret');
    return json({ token_type: 'Bearer', access_token: body.get('code'), refresh_token: 'never-retained' });
  }
  assert.equal(url, 'https://discord.com/api/v10/users/@me');
  const auth = new Headers(init?.headers).get('Authorization');
  return json({ id: auth === 'Bearer allowed' ? allowed : denied, username: auth === 'Bearer allowed' ? 'allowed-test-user' : 'denied-test-user', email: 'never-returned@example.test' });
};
async function fixture(c = settings(), request = discord, now = Date.now, variant = 'staff') {
  const directory = await mkdtemp(path.join(tmpdir(), 'dc-doc-test-'));
  await mkdir(path.join(directory, '01-getting-started'));
  const filename = path.join(directory, '01-getting-started/index.md');
  await writeFile(filename, '---\ntitle: Private fixture\ncategory: 01-getting-started\ncategoryTitle: Getting started\norder: 0\naudience: [admin, ai]\ntags: [fixture]\n---\n# Private fixture\n\nINTERNAL-DOC-SENTINEL');
  const app = createApp(variant, c, request, now, directory);
  const server = app.listen(0, '127.0.0.1'); await once(server, 'listening');
  const base = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  return { base, close: async () => { await new Promise<void>(resolve => server.close(() => resolve())); await unlink(filename); await rmdir(path.join(directory, '01-getting-started')); await rmdir(directory); } };
}
async function start(base: string) {
  const res = await fetch(`${base}/auth/discord`, { redirect: 'manual' });
  assert.equal(res.status, 302);
  const url = new URL(res.headers.get('location')!);
  assert.equal(url.origin, 'https://discord.com');
  assert.equal(url.searchParams.get('scope'), 'identify');
  assert.ok(!url.searchParams.has('client_secret'));
  return { state: url.searchParams.get('state')!, cookie: res.headers.getSetCookie()[0].split(';')[0] };
}
async function login(base: string, code: 'allowed' | 'denied') {
  const flow = await start(base);
  const res = await fetch(`${base}/auth/discord/callback?code=${code}&state=${flow.state}`, { redirect: 'manual', headers: { Cookie: flow.cookie } });
  assert.equal(res.status, 302); assert.equal(res.headers.get('location'), '/');
  return res.headers.getSetCookie().find(c => c.startsWith('dc_session=') || c.startsWith('__Host-dc_session='))!.split(';')[0];
}

test('public APIs work with zero OAuth/Basic credentials; docs remain protected', async () => {
  const c = { ...settings(), discordClientId: '', discordClientSecret: '', discordRedirectUri: '', discordAllowedIds: new Set<string>(), production: true };
  assert.equal(loginAvailable(c), false);
  const f = await fixture(c);
  try {
    assert.equal((await fetch(`${f.base}/healthz`)).status, 200);
    const publicRes = await fetch(`${f.base}/api/public/status`);
    assert.equal(publicRes.status, 200);
    assert.equal(publicRes.headers.get('www-authenticate'), null);
    const body = await publicRes.json(); assert.equal(body.servers.length, 6);
    assert.ok(body.servers.every((s: any) => s.state === 'UNKNOWN' && s.players === null && s.responseMs === null));
    assert.equal((await fetch(`${f.base}/api/internal/docs`)).status, 401);
    assert.equal((await fetch(`${f.base}/docs`)).status, 401);
    assert.equal((await fetch(`${f.base}/api/internal/docs/page/01-getting-started/index`)).status, 401);
    assert.equal((await fetch(`${f.base}/docs/internal/server-manager.md`)).status, 404);
    assert.equal((await fetch(`${f.base}/api/staff/status`)).status, 404);
    const session = await (await fetch(`${f.base}/api/session`)).json();
    assert.equal(session.loginAvailable, false); assert.equal(session.internalAccess, false);
  } finally { await f.close(); }
});
test('unlisted Discord ID can sign in but cannot read documentation', async () => {
  const f = await fixture();
  try {
    const cookie = await login(f.base, 'denied'), headers = { Cookie: cookie };
    const session = await (await fetch(`${f.base}/api/session`, { headers })).json();
    assert.equal(session.authenticated, true); assert.equal(session.internalAccess, false);
    const deniedRes = await fetch(`${f.base}/api/internal/docs/page/01-getting-started/index`, { headers });
    assert.equal(deniedRes.status, 403); assert.match(await deniedRes.text(), /No internal access/);
    assert.equal((await fetch(`${f.base}/api/public/status`, { headers })).status, 200);
    const text = JSON.stringify(session);
    for (const secret of [allowed, denied, 'test-only-discord-secret', 'never-retained', 'never-returned']) assert.ok(!text.includes(secret));
  } finally { await f.close(); }
});
test('allowed ID reads docs; allowlist changes, CSRF logout and session invalidation are enforced', async () => {
  const c = settings(), f = await fixture(c);
  try {
    const cookie = await login(f.base, 'allowed'), headers = { Cookie: cookie };
    const session = await (await fetch(`${f.base}/api/session`, { headers })).json();
    assert.equal(session.internalAccess, true);
    assert.equal((await (await fetch(`${f.base}/api/internal/docs`, { headers })).json()).length, 1);
    const doc = await fetch(`${f.base}/api/internal/docs/page/01-getting-started/index`, { headers });
    assert.equal(doc.status, 200); assert.equal(doc.headers.get('cache-control'), 'private, no-store');
    assert.match(await doc.text(), /INTERNAL-DOC-SENTINEL/);
    assert.equal((await fetch(`${f.base}/api/internal/docs/page/unknown`, { headers })).status, 404);
    c.discordAllowedIds.clear();
    assert.equal((await fetch(`${f.base}/api/internal/docs/page/01-getting-started/index`, { headers })).status, 403);
    c.discordAllowedIds.add(allowed);
    assert.equal((await fetch(`${f.base}/auth/logout`, { method: 'POST', headers })).status, 403);
    assert.equal((await fetch(`${f.base}/auth/logout`, { method: 'POST', headers: { ...headers, 'X-CSRF-Token': session.csrfToken } })).status, 204);
    assert.equal((await fetch(`${f.base}/api/internal/docs`, { headers })).status, 401);
  } finally { await f.close(); }
});
test('OAuth state is cookie-bound, single-use and expires; sessions expire too', async () => {
  let time = Date.now(); const f = await fixture(settings(), discord, () => time);
  try {
    const flow = await start(f.base);
    const callback = `${f.base}/auth/discord/callback?code=allowed&state=${flow.state}`;
    assert.equal((await fetch(callback, { redirect: 'manual' })).status, 400);
    assert.equal((await fetch(callback, { redirect: 'manual', headers: { Cookie: flow.cookie } })).status, 302);
    assert.equal((await fetch(callback, { redirect: 'manual', headers: { Cookie: flow.cookie } })).status, 400);
    const stale = await start(f.base); time += 600001;
    assert.equal((await fetch(`${f.base}/auth/discord/callback?code=allowed&state=${stale.state}`, { redirect: 'manual', headers: { Cookie: stale.cookie } })).status, 400);
    const cookie = await login(f.base, 'allowed'); time += 8 * 3600000 + 1;
    assert.equal((await fetch(`${f.base}/api/internal/docs`, { headers: { Cookie: cookie } })).status, 401);
  } finally { await f.close(); }
});
test('production cookies have Secure, HttpOnly, SameSite=Lax and Host scope', async () => {
  const f = await fixture({ ...settings(), production: true, discordRedirectUri: 'https://staff.diamondcrew.net/auth/discord/callback' });
  try {
    const flow = await start(f.base);
    const res = await fetch(`${f.base}/auth/discord/callback?code=allowed&state=${flow.state}`, { redirect: 'manual', headers: { Cookie: flow.cookie } });
    const cookie = res.headers.getSetCookie().find(c => c.startsWith('__Host-dc_session='))!;
    for (const property of ['HttpOnly', 'Secure', 'SameSite=Lax', 'Path=/']) assert.ok(cookie.includes(property));
    assert.ok(!cookie.includes('Domain='));
  } finally { await f.close(); }
});
test('public-status exposes no session, OAuth or docs APIs', async () => {
  const f = await fixture(settings(), discord, Date.now, 'public');
  try {
    assert.equal((await fetch(`${f.base}/api/public/status`)).status, 200);
    for (const route of ['/api/session', '/api/internal/docs', '/api/internal/docs/page/01-getting-started/index', '/auth/discord']) assert.equal((await fetch(f.base + route)).status, 404);
  } finally { await f.close(); }
});
test('monitoring projects only safe data and adapters never fabricate metrics', async () => {
  const c = { ...settings(), token: 'test-only-panel-secret', pterodactylUrl: 'https://private-panel.example.test', targets: readTargets('[{"id":"prismatic-dev","pterodactylId":"private-server-id","fivemUrl":"http://private-host:30131"}]') };
  const request: Fetcher = async input => String(input).includes('/resources') ? json({ attributes: { current_state: 'running', resources: { cpu_absolute: 97 } } }) : json([{ name: 'SECRET_PLAYER', identifiers: ['license:secret'] }]);
  const result = await createMonitor(c, request)();
  const server = result.servers.find(s => s.id === 'prismatic-dev')!;
  assert.equal(server.state, 'ONLINE'); assert.equal(server.players, 1); assert.ok(server.responseMs !== null);
  for (const term of ['private-host', 'private-panel', 'private-server-id', 'SECRET_PLAYER', 'license:secret', 'cpu_absolute', c.token]) assert.ok(!JSON.stringify(result).includes(term));
  const failed: Fetcher = async () => json({}, 403);
  assert.equal((await readStatus(c.targets[0], c, failed)).state, 'UNKNOWN');
  assert.equal((await readStatus({ id: 'dia-01', healthUrl: 'http://private-host/healthz' }, c, failed)).state, 'OFFLINE');
  assert.equal((await readStatus({ id: 'minecraft', maintenance: true }, c, failed)).state, 'MAINTENANCE');
  assert.throws(() => readTargets('[{"id":"dia-01","healthUrl":"https://user:password@example.test"}]'));
  assert.throws(() => readTargets('[{"id":"not-allowed"}]'));
  assert.deepEqual(services.filter(s => s.enabled).map(s => s.id), ['manager', 'controller', 'prismatic-dev', 'status']);
});
