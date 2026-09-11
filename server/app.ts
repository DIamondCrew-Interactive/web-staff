import express from 'express';
import { configureTrustedProxy } from './trusted-proxy.js';
import { mountLauncher } from './launcher.js';
import { publicWebServices } from './web-status.js';
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
    res.json(variant === 'staff' ? snapshot : { ...snapshot, webServices: publicWebServices(snapshot.webServices), servers: snapshot.servers.filter(s => !s.id.endsWith('-dev')).map(s => ({ ...s, name: s.id === 'dia-01' ? 'Infrastructure' : s.name.replace(' PROD', ' Roleplay') })) });
  });
  if (variant === 'staff') {
    mountLauncher(app);
    const auth = createAuth(c, request, now);
    auth.mount(app);
    mountSso(app, c, auth, now);
    app.get('/docs', auth.requireDocs, (_req, res, next) => { res.locals.docsAuthorized = true; next(); });
    mountDocs(app, auth.requireDocs, docsDirectory);
  }
  // No filesystem documents or backend sources are public, including in development.
  app.use(['/docs', '/server'], (req, res, next) => { if (res.locals.docsAuthorized && req.originalUrl.split('?')[0] === '/docs') next(); else res.status(404).send('Not found'); });
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));
  return app;
}
