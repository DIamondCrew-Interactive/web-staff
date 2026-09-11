import type {AccessReader} from './access-store.js';
import type {AccessService} from '../src/shared/access.js';
import express from 'express';
import { createRateBudget, requestAddress } from './rate-budget.js';
import { createHash, randomBytes, randomUUID, timingSafeEqual, sign } from 'node:crypto';
import type { Express, Request, Response } from 'express';
import { readSigningKey } from './sso-config.js';
import type { AppConfig } from './config.js';
import type { createAuth } from './auth.js';

const digest = (value: string) => createHash('sha256').update(value).digest();
const equal = (a: string, b: string) => timingSafeEqual(digest(a), digest(b));
const tokenPattern = /^[A-Za-z0-9_-]{43}$/;
export const SSO_TTL_SECONDS = 45;
interface Claims { iss: string; aud: string; sub: string; iat: number; exp: number; state: string; jti: string; access_epoch?:number }
interface Pending { claims: Claims; challenge: string; active: () => boolean }

export function mountSso(app: Express, c: AppConfig, auth: ReturnType<typeof createAuth>, now = Date.now, access?:AccessReader) {
  if (!c.ssoEnabled) return;
  if (c.ssoIssuer !== 'https://staff.diamondcrew.net' || !/^[A-Za-z0-9_-]{1,64}$/.test(c.ssoKeyId) || !c.ssoClients.length || !c.sessionSecret) throw new Error('Invalid SSO configuration');
  const signingKey = readSigningKey(c.ssoPrivateKeyFile);
  // One process owns sessions and atomic consumption; restart revokes pending grants.
  const tickets = new Map<string, Pending>();
  const issueBudget = createRateBudget(120, now), redeemBudget = createRateBudget(600, now, 60000, 20), invalidClientBudget = createRateBudget(60, now);
  const json = express.json({ limit: '4kb', strict: true });
  app.use(['/sso', '/api/sso'], (_req, res, next) => {
    res.set({ 'Cache-Control': 'private, no-store', 'Pragma': 'no-cache', 'Referrer-Policy': 'no-referrer' }); next();
  });
  function pruneTickets() {
    for (const [key, pending] of tickets) if (pending.claims.exp <= Math.floor(now() / 1000)) tickets.delete(key);
  }
  function input(state: unknown, challenge: unknown) {
    return typeof state === 'string' && /^[A-Za-z0-9_-]{43,128}$/.test(state) && typeof challenge === 'string' && /^[A-Za-z0-9_-]{43}$/.test(challenge);
  }
  function issue(req: Request, res: Response, audience: string, state: string, challenge: string, redirect: boolean) {
    const client = c.ssoClients.find(client => client.id === audience), session = auth.session(req);
    if (!client) { res.status(404).json({ error: 'Unknown SSO client' }); return; }
    if (!session) { res.status(401).json({ error: 'Sign in first' }); return; }
    if (!(access ? access.allowed(session.user.id, client.id as AccessService) : client.allowedDiscordIds.has(session.user.id))) { res.status(403).json({ error: 'No access to this service' }); return; }
    pruneTickets();
    if (!issueBudget(requestAddress(req)) || tickets.size >= 10000) { res.status(429).json({error:'Try again later'}); return; }
    const ticket = randomBytes(32).toString('base64url'), seconds = Math.floor(now() / 1000);
    tickets.set(digest(ticket).toString('hex'), { challenge, active: () => auth.sessionActive(session), claims: { iss: c.ssoIssuer, aud: client.id, sub: session.user.id, ...(access && client.id === 'image-service' ? {access_epoch:access.user(session.user.id)!.epoch} : {}), iat: seconds, exp: seconds + SSO_TTL_SECONDS, state, jti: randomUUID() } });
    const target = new URL(client.callbackUrl);
    target.search = new URLSearchParams({ ticket, state }).toString();
    if (redirect) res.redirect(303, target.href);
    else res.json({ redirect_url: target.href, expires_in: SSO_TTL_SECONDS });
  }
  app.get('/sso/:audience', (req, res) => {
    const client = c.ssoClients.find(client => client.id === req.params.audience);
    if (!client) { res.status(404).json({ error: 'Unknown SSO client' }); return; }
    // Direct Staff links bootstrap the browser-bound transaction at the relying party.
    if (!Object.keys(req.query).length) { res.redirect(303, client.startUrl); return; }
    if (Object.keys(req.query).some(key => !['state', 'code_challenge'].includes(key)) || !input(req.query.state, req.query.code_challenge)) { res.status(400).json({ error: 'Invalid SSO transaction' }); return; }
    const state = req.query.state as string, challenge = req.query.code_challenge as string;
    if (!auth.session(req)) {
      auth.beginLogin(req, res, `/sso/${client.id}?${new URLSearchParams({ state, code_challenge: challenge })}`); return;
    }
    issue(req, res, client.id, state, challenge, true);
  });
  app.post('/api/sso/tickets', auth.requireWrite, json, (req, res) => {
    if (!req.body || typeof req.body.audience !== 'string' || !input(req.body.state, req.body.code_challenge) || Object.keys(req.body).some(key => !['audience', 'state', 'code_challenge'].includes(key))) { res.status(400).json({ error: 'Invalid SSO transaction' }); return; }
    issue(req, res, req.body.audience, req.body.state, req.body.code_challenge, false);
  });
  app.post('/sso/api/redeem', json, (req, res) => {
    const client = c.ssoClients.find(client => client.id === req.body?.audience);
    const secret = req.get('Authorization')?.match(/^Bearer ([A-Za-z0-9_-]{43,128})$/)?.[1] || '';
    if (!client || !equal(secret, client.clientSecret)) { res.status(invalidClientBudget(requestAddress(req)) ? 401 : 429).json({ error: 'Invalid client authentication' }); return; }
    if (!redeemBudget(client.id)) { res.status(429).json({error:'Try again later'}); return; }
    pruneTickets();
    const { ticket, state, code_verifier: verifier } = req.body;
    if (typeof state !== 'string' || !/^[A-Za-z0-9_-]{43,128}$/.test(state) || Object.keys(req.body).some(key => !['ticket', 'state', 'code_verifier', 'audience'].includes(key)) || typeof ticket !== 'string' || !tokenPattern.test(ticket) || typeof verifier !== 'string' || !/^[A-Za-z0-9_-]{43,128}$/.test(verifier)) { res.status(400).json({ error: 'Invalid ticket request' }); return; }
    const key = digest(ticket).toString('hex'), pending = tickets.get(key);
    if (!pending || !pending.active() || !equal(state, pending.claims.state) || pending.claims.aud !== client.id || pending.claims.exp <= Math.floor(now() / 1000) || !(access ? access.allowed(pending.claims.sub, client.id as AccessService) : client.allowedDiscordIds.has(pending.claims.sub)) || !equal(digest(verifier).toString('base64url'), pending.challenge)) { res.status(400).json({ error: 'Invalid or expired ticket' }); return; }
    tickets.delete(key); // Synchronous, before sending identity: exactly one winner.
    const header = Buffer.from(JSON.stringify({alg: 'EdDSA', typ: 'JWT', kid: c.ssoKeyId})).toString('base64url');
    const issued = Math.floor(now() / 1000);
    const payload = Buffer.from(JSON.stringify({...pending.claims, iat: issued, exp: issued + SSO_TTL_SECONDS})).toString('base64url');
    const input = header + '.' + payload;
    const assertion = input + '.' + sign(null, Buffer.from(input), signingKey).toString('base64url');
    res.json({assertion, token_type: 'DCI-SSO', expires_in: SSO_TTL_SECONDS});
  });
}
