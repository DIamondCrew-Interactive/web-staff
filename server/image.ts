import express from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';
import { config } from './config.js';
import { createImageApp, imageConfig, mediaErrorHandler } from './media/app.js';
const { app, publicFiles } = await createImageApp(config, imageConfig());
app.get('/', (_req, res) => res.redirect('/manage'));
if (config.production) {
  app.use('/assets', express.static(path.resolve('dist/image/assets'), { immutable: true, maxAge: '1y', index: false }));
  app.get('/diamondcrew-logo.png', (_req, res) => res.sendFile(path.resolve('dist/image/diamondcrew-logo.png')));
  app.get('/manage', (_req, res) => { res.set('Cache-Control', 'no-store'); res.sendFile(path.resolve('dist/image/image.html')); });
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({ server: { middlewareMode: true, fs: { strict: true, deny: ['.env', '.env.*', '**/server/**', '**/docs/**', '**/.media/**', '**/.artifacts/**', '**/tests/**', '**/*.{key,pem}'] } }, appType: 'custom' });
  app.get('/manage', async (req, res) => res.type('html').send(await vite.transformIndexHtml(req.originalUrl, await fs.readFile('image.html', 'utf8'))));
  app.use(vite.middlewares);
}
app.use(publicFiles);
app.use(mediaErrorHandler);
const server = app.listen(config.port, '0.0.0.0', () => console.log(`DiamondCrew Image Service listening on :${config.port}`));
server.requestTimeout = 120000;
server.headersTimeout = 15000;
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => { server.close(() => process.exit(0)); setTimeout(() => process.exit(1), 10000).unref(); });
