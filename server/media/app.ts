import express from 'express';
import multer from 'multer';
import { createHash } from 'node:crypto';
import type { AppConfig } from '../config.js';
import { createAuth } from '../auth.js';
import type { Fetcher } from '../adapters.js';
import { LocalStorageAdapter, MediaError, mediaPath, validatedImage, type StorageAdapter } from './storage.js';

export interface ImageConfig { root: string; publicOrigin: string; maxUploadBytes: number; maxBatchBytes: number; maxFiles: number; cacheSeconds: number }
function positive(raw: string | undefined, fallback: number, max: number) { const n = Number(raw || fallback); if (!Number.isInteger(n) || n < 1 || n > max) throw Error('Invalid Image Service limit'); return n; }
export function imageConfig(): ImageConfig {
  const origin = new URL(process.env.IMAGE_PUBLIC_URL || 'https://img.dcrp.cz');
  if (!['http:', 'https:'].includes(origin.protocol) || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) throw Error('Invalid IMAGE_PUBLIC_URL');
  return { root: process.env.IMAGE_STORAGE_ROOT || './.media', publicOrigin: origin.origin, maxUploadBytes: positive(process.env.IMAGE_MAX_UPLOAD_MB, 25, 100) * 1048576, maxBatchBytes: positive(process.env.IMAGE_MAX_BATCH_MB, 50, 200) * 1048576, maxFiles: positive(process.env.IMAGE_MAX_BATCH_FILES, 10, 25), cacheSeconds: positive(process.env.IMAGE_CACHE_SECONDS, 300, 86400) };
}
export async function createImageApp(c: AppConfig, media: ImageConfig, request: Fetcher = fetch, storage: StorageAdapter = new LocalStorageAdapter(media.root, media.publicOrigin)) {
  if (storage instanceof LocalStorageAdapter) await storage.initialize();
  const app = express(); app.disable('x-powered-by');
  app.use((_req, res, next) => { res.set({ 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'X-Frame-Options': 'DENY', 'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: https://cdn.discordapp.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" }); next(); });
  app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));
  const auth = createAuth(c, request); auth.mount(app);
  app.use('/api/media', auth.requireDocs, (req, res, next) => { res.set('Cache-Control', 'private, no-store'); if (['GET', 'HEAD'].includes(req.method)) next(); else auth.requireWrite(req, res, next); });
  // One mutation at a time, including multipart parsing, bounds upload memory and
  // prevents collision checks from racing another authorized writer in this process.
  let busy = false;
  app.use('/api/media', (req, res, next) => {
    if (['GET', 'HEAD'].includes(req.method)) { if (busy) { res.status(503).json({ error: 'Media update in progress. Retry shortly.' }); return; } next(); return; }
    if (busy) { res.status(429).json({ error: 'Another media operation is in progress' }); return; }
    busy = true; let finished = false, closed = false;
    const release = () => { if (finished && closed) busy = false; };
    res.locals.operationFinished = () => { finished = true; release(); };
    res.on('finish', () => { closed = true; release(); }); res.on('close', () => { closed = true; release(); });
    next();
  });
  app.use('/api/media', express.json({ limit: '8kb' }));
  const action = (fn: (req: express.Request, res: express.Response) => Promise<unknown>): express.RequestHandler => async (req, res, next) => { try { await fn(req, res); } catch(e) { next(e); } finally { res.locals.operationFinished?.(); } };
  const parameter = (value: unknown, empty = false) => mediaPath(value ?? '', empty);
  app.get('/api/media', action(async (req, res) => { const search = req.query.q ?? ''; if (typeof search !== 'string' || search.length > 100) throw new MediaError(400, 'Invalid search'); res.json(await storage.list(parameter(req.query.path, true), search)); }));
  app.get('/api/media/info', action(async (req, res) => res.json(await storage.stat(parameter(req.query.path)))));
  app.post('/api/media/folder', action(async (req, res) => res.status(201).json(await storage.mkdir(parameter(req.body?.path)))));
  const received = new WeakMap<express.Request, number>();
  const boundedMemory: multer.StorageEngine = {
    _handleFile(req, file, callback) {
      let chunks: Buffer[] = [], size = 0, done = false;
      file.stream.on('data', (chunk: Buffer) => {
        if (done) return;
        const total = (received.get(req) || 0) + chunk.length; received.set(req, total);
        if (total > media.maxBatchBytes) { done = true; chunks = []; callback(new MediaError(413, 'Batch exceeds upload limit')); return; }
        chunks.push(chunk); size += chunk.length;
      });
      file.stream.on('end', () => { if (!done) { done = true; callback(null, { buffer: Buffer.concat(chunks), size }); } });
      file.stream.on('error', error => { if (!done) { done = true; chunks = []; callback(error); } });
    },
    _removeFile(_req, file, callback) { file.buffer = Buffer.alloc(0); callback(null); },
  };
  const upload = multer({ storage: boundedMemory, preservePath: true, limits: { fileSize: Math.min(media.maxUploadBytes, media.maxBatchBytes), files: media.maxFiles, fields: 0, parts: media.maxFiles + 1, fieldNameSize: 20 } }).array('files', media.maxFiles);
  app.post('/api/media/upload', (req, res, next) => {
    // Reject declared oversized batches before buffering; streaming aggregate byte cap
    // also applies when Content-Length is omitted/chunked.
    const limit = media.maxBatchBytes + media.maxFiles * 2048;
    if (Number(req.headers['content-length'] || 0) > limit) { next(new MediaError(413, 'Batch exceeds upload limit')); return; }
    upload(req, res, next);
  }, action(async (req, res) => {
    const folder = parameter(req.query.path, true), files = req.files as Express.Multer.File[];
    if (!files?.length) throw new MediaError(400, 'Select at least one image');
    if (files.reduce((n, f) => n + f.size, 0) > media.maxBatchBytes) throw new MediaError(413, 'Batch exceeds upload limit');
    const names = new Set<string>(), prepared: { target: string; data: Buffer }[] = [];
    const overwrite = req.query.overwrite === 'true';
    for (const file of files) {
      if (file.originalname.includes('/')) throw new MediaError(400, 'Upload filename must not contain a path');
      const target = parameter(folder ? `${folder}/${file.originalname}` : file.originalname);
      if (names.has(target.toLowerCase())) throw new MediaError(409, 'Duplicate filenames in batch'); names.add(target.toLowerCase());
      try { const existing = await storage.stat(target); if (!overwrite || existing.kind !== 'file') throw new MediaError(409, `File exists: ${file.originalname}. Rename or confirm overwrite.`); }
      catch(e) { if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e; }
      prepared.push({ target, data: await validatedImage(file.buffer, file.originalname, file.mimetype, media.maxUploadBytes) });
    }
    const results = [];
    // Validation/collision failures write nothing. Disk failure may leave a partial batch;
    // UI refreshes inventory after errors; each individual file is atomically published.
    for (const file of prepared) results.push(await storage.upload(file.target, file.data, overwrite));
    res.status(201).json({ entries: results });
  }));
  for (const route of ['move', 'rename', 'copy']) app.patch(`/api/media/${route}`, action(async (req, res) => res.json(await storage.move(parameter(req.body?.source), parameter(req.body?.target), route === 'copy'))));
  for (const kind of ['file', 'folder'] as const) app.delete(`/api/media/${kind}`, action(async (req, res) => { await storage.delete(parameter(req.body?.path), kind, typeof req.body?.confirmation === 'string' ? req.body.confirmation : undefined); res.status(204).end(); }));
  app.use('/api', (_req, res) => { res.locals.operationFinished?.(); res.status(404).json({ error: 'Not found' }); });
  return { app, storage, publicFiles: action(async (req, res) => {
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) { res.set('Allow', 'GET, HEAD, OPTIONS').status(405).end(); return; }
    let target: string;
    try { target = decodeURIComponent(req.path.slice(1)); } catch { throw new MediaError(400, 'Invalid media path'); }
    parameter(target);
    if (req.method === 'OPTIONS') { res.set({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS' }).status(204).end(); return; }
    const { entry, handle } = await storage.read(target);
    const stat = await handle.stat({ bigint: true });
    const etag = `W/"${createHash('sha256').update(`${stat.ino}:${stat.size}:${stat.mtimeNs}:${stat.ctimeNs}`).digest('hex').slice(0,32)}"`;
    res.set({ 'Content-Type': entry.mime!, 'Content-Length': String(entry.size), 'Cache-Control': `public, max-age=${media.cacheSeconds}, must-revalidate`, 'ETag': etag, 'Last-Modified': new Date(entry.modified).toUTCString(), 'Access-Control-Allow-Origin': '*', 'Cross-Origin-Resource-Policy': 'cross-origin' });
    const condition = req.get('If-None-Match');
    const same = condition ? condition === '*' || condition.split(',').some(v => v.trim().replace(/^W\//,'') === etag.replace(/^W\//,'')) : req.get('If-Modified-Since') && Date.parse(req.get('If-Modified-Since')!) >= Math.floor(Date.parse(entry.modified) / 1000) * 1000;
    if (same) { await handle.close(); res.status(304).end(); return; }
    if (req.method === 'HEAD') { await handle.close(); res.end(); return; }
    const stream = handle.createReadStream(); stream.on('error', () => res.destroy()); res.on('close', () => stream.destroy()); stream.pipe(res);
  }) };
}
export const mediaErrorHandler: express.ErrorRequestHandler = (error, _req, res, _next) => {
  res.locals.operationFinished?.();
  if (res.headersSent) { res.end(); return; }
  const code = error?.code;
  const status = error instanceof MediaError ? error.status : error instanceof multer.MulterError ? 413 : code === 'ENOENT' ? 404 : code === 'EEXIST' || code === 'ENOTEMPTY' ? 409 : error?.type === 'entity.parse.failed' ? 400 : 503;
  res.status(status).json({ error: error instanceof MediaError ? error.message : status === 404 ? 'Media not found' : status === 413 ? 'Upload limits exceeded' : status === 409 ? 'Destination already exists' : 'Media operation could not be completed' });
};
