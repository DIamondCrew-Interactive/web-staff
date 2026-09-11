import {mountStatusHistory} from './status-history.js';
import {AccessStore,AccessError} from './access-store.js';
import {mountAccessAdmin} from './access-admin.js';
import type {AccessService} from '../src/shared/access.js';
import express from 'express';
import { configureTrustedProxy } from './trusted-proxy.js';
import { mountLauncher } from './launcher.js';
import { config, type AppConfig } from './config.js';
import { createMonitor } from './monitoring.js';
import { createAuth } from './auth.js';
import { mountDocs } from './docs.js';
import { mountSso } from './sso.js';
import type { Fetcher } from './adapters.js';

export function createApp(variant = config.variant, c: AppConfig = config, request: Fetcher = fetch, now = Date.now, docsDirectory = 'docs/internal') {
  const app = express();
  configureTrustedProxy(app);
  const monitor = createMonitor(c, request);
  mountStatusHistory(app, monitor);
  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.set({ 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'X-Frame-Options': 'DENY', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()' });
    if (c.production) res.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.discordapp.com; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
    next();
  });
  app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));
  app.get('/api/public/status', async (_req, res) => {
    res.set('Cache-Control', 'no-store');
    const snapshot = await monitor();
    res.json(snapshot);
  });
  if (variant === 'staff') {
    mountLauncher(app);
    const legacy = new Map<string,AccessService[]>();
    if (c.accessBootstrapLegacy) { for (const id of c.discordAllowedIds) legacy.set(id,['cookbook']); for (const client of c.ssoClients) for (const id of client.allowedDiscordIds) legacy.set(id,[...(legacy.get(id)||[]),client.id as AccessService]); }
    const access = c.accessStoreDirectory ? new AccessStore({directory:c.accessStoreDirectory,adminIds:c.staffAdminIds,legacy:c.accessBootstrapLegacy?legacy:undefined,now}) : undefined;
    const auth = createAuth(c, request, now, access);
    auth.mount(app);
    mountSso(app, c, auth, now, access);
    const requireAdmin = mountAccessAdmin(app, auth, access, now);
    app.get('/admin/access', requireAdmin || ((_req,res)=>{res.status(404).send('Not found');}), (_req,res,next)=>{res.locals.accessAuthorized=true;next();});
    app.get('/docs', auth.requireDocs, (_req, res, next) => { res.locals.docsAuthorized = true; next(); });
    mountDocs(app, auth.requireDocs, docsDirectory);
  }
  // No filesystem documents or backend sources are public, including in development.
  app.use(['/docs', '/server'], (req, res, next) => { if (res.locals.docsAuthorized && req.originalUrl.split('?')[0] === '/docs') next(); else res.status(404).send('Not found'); });
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));
  app.use((error:unknown,_req:express.Request,res:express.Response,next:express.NextFunction)=>{if(error instanceof AccessError){res.status(error.status).json({error:'Access management unavailable'});return;}next(error);});
  return app;
}
