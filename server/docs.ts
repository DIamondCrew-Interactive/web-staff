import type { Express, RequestHandler } from 'express';
import { aiEntry, loadCookbook, metadata, searchCookbook, validSlug } from './cookbook.js';
import type { CookbookPage } from '../src/shared/types.js';

export function mountDocs(app: Express, requireDocs: RequestHandler, directory = 'docs/internal') {
  let cached: CookbookPage[] | null = null, pending: Promise<CookbookPage[]> | null = null, expires = 0;
  const pages = async () => {
    if (cached && Date.now() < expires) return cached;
    if (!pending) pending = loadCookbook(directory);
    try { cached = await pending; expires = Date.now() + 30000; return cached; } finally { pending = null; }
  };
  const readonly: RequestHandler = (req, res, next) => {
    res.set({ 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'private, no-store' });
    if (!['GET', 'HEAD'].includes(req.method)) { res.set('Allow', 'GET, HEAD'); res.status(405).json({ error: 'Read-only Cookbook API' }); return; }
    let pathname = req.originalUrl.split('?')[0];
    try { for (let i = 0; i < 4 && pathname.includes('%'); i++) pathname = decodeURIComponent(pathname); }
    catch { res.status(400).json({ error: 'Invalid path' }); return; }
    if (pathname.includes('%') || pathname.includes('..') || pathname.includes('\\') || pathname.includes('//') || pathname.includes(':') || /[\x00-\x1f]/.test(pathname)) { res.status(400).json({ error: 'Invalid path' }); return; }
    next();
  };
  // Unlisted is discoverability only. Both APIs use exactly the same approved, secret-free root.
  app.use('/api/internal', requireDocs);
  app.use(['/api/cookbook', '/api/internal/docs', '/ai'], readonly);
  const endpoint = (handler: (req: Parameters<RequestHandler>[0], res: Parameters<RequestHandler>[1], all: CookbookPage[]) => unknown): RequestHandler => async (req, res) => {
    try { await handler(req, res, await pages()); }
    catch { res.status(503).json({ error: 'Cookbook is unavailable or failed validation.' }); }
  };
  for (const prefix of ['/api/internal/docs', '/api/cookbook']) {
    app.get(`${prefix}/index`, endpoint((_req, res, all) => res.json(metadata(all))));
    app.get(`${prefix}/search`, endpoint((req, res, all) => {
      if (typeof req.query.q !== 'string' || req.query.q.length > 200 || (req.query.filter && !['all', 'user', 'infrastructure', 'ai', 'troubleshooting'].includes(String(req.query.filter)))) { res.status(400).json({ error: 'Invalid search' }); return; }
      res.json(searchCookbook(all, req.query.q, String(req.query.filter || 'all')));
    }));
    for (const format of ['page', 'raw']) app.get(`${prefix}/${format}/*docPath`, endpoint((req, res, all) => {
      const input = req.params.docPath;
      const slug = (Array.isArray(input) ? input.join('/') : input).replace(/\.md$/, '');
      if (!validSlug(slug)) { res.status(400).json({ error: 'Invalid page path' }); return; }
      const page = all.find(p => p.slug === slug);
      if (!page) { res.status(404).json({ error: 'Page not found' }); return; }
      if (format === 'raw') res.type('text/markdown').send(page.markdown); else res.json(page);
    }));
    app.get(`${prefix}/bundle`, endpoint((_req, res, all) => res.json({ generatedAt: new Date().toISOString(), pages: all })));
  }
  app.get('/api/internal/docs', endpoint((_req, res, all) => res.json(metadata(all))));
  app.get('/ai/cookbook.md', endpoint((_req, res, all) => res.type('text/markdown').send(aiEntry(all))));
}
