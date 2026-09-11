import fs from 'node:fs/promises';
import path from 'node:path';
import { constants } from 'node:fs';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import type { MediaEntry, MediaListing } from '../../src/shared/media.js';

export class MediaError extends Error { constructor(public status: number, message: string) { super(message); } }
const mimeByExtension: Record<string, string> = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' };
const fail = (message = 'Invalid media path'): never => { throw new MediaError(400, message); };
export function mediaPath(value: unknown, rootAllowed = false): string {
  if (typeof value !== 'string' || value.length > 600) return fail();
  if (!value && rootAllowed) return '';
  const parts = value.split('/');
  if (parts.length > 16 || parts.some(p => !/^[\p{L}0-9][\p{L}\p{M}0-9_.'-]{0,127}$/u.test(p) || /\p{Default_Ignorable_Code_Point}/u.test(p) || Buffer.byteLength(p, 'utf8') > 255 || p.includes('..') || p.endsWith('.') || /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(?:\.|$)/i.test(p))) return fail();
  if (['api', 'auth', 'manage', 'healthz', 'assets', 'branding', 'robots.txt', 'diamondcrew-logo.png'].includes(parts[0].toLowerCase())) return fail('Reserved top-level path');
  return value;
}
export function mediaMime(name: string) { return mimeByExtension[path.posix.extname(name).toLowerCase()]; }
export interface StorageAdapter {
  list(folder: string, search?: string): Promise<MediaListing>;
  mkdir(target: string): Promise<MediaEntry>;
  upload(target: string, data: Buffer, overwrite: boolean): Promise<MediaEntry>;
  move(source: string, target: string, copy?: boolean): Promise<MediaEntry>;
  delete(target: string, kind: 'file' | 'folder', confirmation?: string): Promise<void>;
  stat(target: string): Promise<MediaEntry>;
  read(target: string): Promise<{ entry: MediaEntry; handle: fs.FileHandle }>;
  getPublicUrl(target: string): string;
}
// Single writer per media root. All mutations and reads must pass through this
// adapter; do not share a writable mount with another process or replica.
export class LocalStorageAdapter implements StorageAdapter {
  private root: string;
  constructor(root: string, private publicOrigin: string) { this.root = path.resolve(root); }
  async initialize() {
    // Do not create an arbitrary env path automatically. Deployment provisions the volume.
    const stat = await fs.lstat(this.root);
    if (stat.isSymbolicLink() || !stat.isDirectory()) throw new MediaError(503, 'Media storage unavailable');
    if (await fs.realpath(this.root) !== this.root) throw new MediaError(503, 'Media storage must use its canonical path');
  }
  private async resolve(target: string, missing = false) {
    mediaPath(target, true); await this.initialize();
    let current = this.root;
    for (const segment of target.split('/').filter(Boolean)) {
      current = path.join(current, segment);
      try {
        const stat = await fs.lstat(current);
        if (stat.isSymbolicLink()) throw new MediaError(400, 'Symlinks are not allowed');
        const real = await fs.realpath(current), relative = path.relative(this.root, real);
        if (relative.startsWith('..') || path.isAbsolute(relative)) fail();
      } catch (e) { if (missing && (e as NodeJS.ErrnoException).code === 'ENOENT') continue; throw e; }
    }
    return current;
  }
  getPublicUrl(target: string) { return `${this.publicOrigin}/${mediaPath(target).split('/').map(segment => encodeURIComponent(segment).replaceAll("'", '%27')).join('/')}`; }
  async stat(target: string): Promise<MediaEntry> {
    const absolute = await this.resolve(target), s = await fs.lstat(absolute);
    if (!s.isFile() && !s.isDirectory()) fail();
    const mime = s.isFile() ? mediaMime(target) : null;
    if (s.isFile() && !mime) throw new MediaError(415, 'Unsupported media type');
    return { path: target, name: path.posix.basename(target), kind: s.isDirectory() ? 'folder' : 'file', size: s.isDirectory() ? 0 : s.size, mime: mime || null, publicUrl: s.isFile() ? this.getPublicUrl(target) : null, modified: s.mtime.toISOString() };
  }
  async list(folder: string, search = ''): Promise<MediaListing> {
    mediaPath(folder, true); const entries: MediaEntry[] = []; let inspected = 0, truncated = false;
    const walk = async (relative: string) => {
      const dir = await this.resolve(relative);
      if (!(await fs.lstat(dir)).isDirectory()) throw new MediaError(400, 'Not a folder');
      // opendir bounds memory even for a large existing media collection.
      for await (const item of await fs.opendir(dir)) {
        if (++inspected > 5000 || entries.length >= 1000) { truncated = true; break; }
        if (item.name.startsWith('.')) continue;
        const child = relative ? `${relative}/${item.name}` : item.name;
        if (item.isSymbolicLink()) throw new MediaError(400, 'Symlinks are not allowed');
        if (!item.isDirectory() && !mediaMime(item.name)) continue;
        const entry = await this.stat(child);
        if (!search || child.toLowerCase().includes(search.toLowerCase())) entries.push(entry);
        if (search && item.isDirectory()) await walk(child);
      }
    };
    await walk(folder);
    entries.sort((a,b) => a.kind.localeCompare(b.kind) * -1 || a.path.localeCompare(b.path));
    return { path: folder, entries, truncated };
  }
  async mkdir(target: string) {
    mediaPath(target); let relative = '';
    for (const part of target.split('/')) {
      relative = relative ? `${relative}/${part}` : part;
      const dest = await this.resolve(relative, true);
      try { await fs.mkdir(dest, { mode: 0o750 }); } catch (e) { if ((e as NodeJS.ErrnoException).code !== 'EEXIST' || !(await fs.lstat(dest)).isDirectory()) throw e; }
    }
    return this.stat(target);
  }
  async upload(target: string, data: Buffer, overwrite: boolean) {
    mediaPath(target); if (!mediaMime(target)) throw new MediaError(415, 'Unsupported media type');
    const parent = path.posix.dirname(target) === '.' ? '' : path.posix.dirname(target);
    await this.resolve(parent);
    const dest = await this.resolve(target, true);
    try { const stat = await fs.lstat(dest); if (!overwrite || !stat.isFile()) throw new MediaError(409, 'File exists. Rename it or explicitly confirm overwrite.'); }
    catch (e) { if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e; }
    const temp = path.join(this.root, `.upload-${randomUUID()}`);
    try {
      await fs.writeFile(temp, data, { flag: 'wx', mode: 0o640 });
      // Atomic rename publishes complete files. No public temporary URL exists.
      await fs.rename(temp, dest);
    } finally { await fs.unlink(temp).catch(e => { if (e.code !== 'ENOENT') throw e; }); }
    return this.stat(target);
  }
  async move(source: string, target: string, copy = false) {
    mediaPath(source); mediaPath(target);
    if (target === source || target.startsWith(`${source}/`)) fail('Cannot move a folder into itself');
    const entry = await this.stat(source), src = await this.resolve(source), dest = await this.resolve(target, true);
    try { await fs.lstat(dest); throw new MediaError(409, 'Destination already exists'); } catch (e) { if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e; }
    await this.resolve(path.posix.dirname(target) === '.' ? '' : path.posix.dirname(target));
    if (entry.kind === 'file' && mediaMime(source) !== mediaMime(target)) throw new MediaError(415, 'Keep the original image type');
    if (entry.kind === 'folder') { if (copy) fail('Copy supports files only'); await this.checkedTree(source); }
    if (copy) await fs.copyFile(src, dest, constants.COPYFILE_EXCL); else await fs.rename(src, dest);
    return this.stat(target);
  }
  private async checkedTree(target: string): Promise<string[]> {
    const absolute = await this.resolve(target), result: string[] = [];
    for await (const item of await fs.opendir(absolute)) {
      if (item.isSymbolicLink()) fail('Symlinks are not allowed');
      const child = `${target}/${item.name}`; mediaPath(child); await this.resolve(child);
      if (item.isDirectory()) result.push(...await this.checkedTree(child));
      else if (!item.isFile()) fail();
      result.push(child);
      if (result.length > 10000) throw new MediaError(413, 'Folder too large for interactive deletion');
    }
    return result;
  }
  async delete(target: string, kind: 'file' | 'folder', confirmation?: string) {
    mediaPath(target); const entry = await this.stat(target), absolute = await this.resolve(target);
    if (entry.kind !== kind) fail('Wrong resource type');
    if (kind === 'file') { await fs.unlink(absolute); return; }
    const descendants = await this.checkedTree(target);
    if (descendants.length && confirmation !== target) throw new MediaError(409, 'Type the full folder path to confirm deleting its contents');
    for (const relative of descendants) {
      const child = await this.resolve(relative), s = await fs.lstat(child);
      if (s.isDirectory()) await fs.rmdir(child); else await fs.unlink(child);
    }
    await fs.rmdir(absolute);
  }
  async read(target: string) {
    const entry = await this.stat(target);
    if (entry.kind !== 'file') throw new MediaError(404, 'Image not found');
    const absolute = await this.resolve(target);
    const handle = await fs.open(absolute, constants.O_RDONLY | (constants.O_NOFOLLOW || 0));
    return { entry, handle };
  }
}
export async function validatedImage(data: Buffer, filename: string, mime: string, maxBytes: number): Promise<Buffer> {
  if (!data.length || data.length > maxBytes) throw new MediaError(413, 'Image exceeds upload limit');
  if (!mediaMime(filename) || mediaMime(filename) !== mime) throw new MediaError(415, 'MIME and extension must match');
  try {
    const image = sharp(data, { animated: true, limitInputPixels: 40_000_000, failOn: 'warning' });
    const info = await image.metadata();
    const formats: Record<string, string> = { png: 'image/png', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif' };
    if (!info.format || formats[info.format] !== mime || (info.pages || 1) > 200) throw Error();
    // Fully decode/re-encode, stripping metadata and appended payloads. SVG is never accepted.
    const output = await image.toBuffer();
    if (output.length > maxBytes) throw new MediaError(413, 'Processed image exceeds upload limit');
    return output;
  } catch (e) { if (e instanceof MediaError) throw e; throw new MediaError(415, 'Invalid or unsafe image content'); }
}
