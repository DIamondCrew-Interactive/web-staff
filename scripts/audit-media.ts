import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { LocalStorageAdapter, mediaPath, mediaMime, validatedImage } from '../server/media/storage.js';
const input = process.argv[2];
if (!input) throw Error('Usage: audit-media <approved-staging-root>');
const root = path.resolve(input);
await new LocalStorageAdapter(root, 'https://img.dcrp.cz').initialize();
let count = 0, bytes = 0;
async function audit(relative = '') {
  for await (const item of await fs.opendir(path.join(root, relative))) {
    const target = relative ? `${relative}/${item.name}` : item.name;
    mediaPath(target);
    if (item.isSymbolicLink()) throw Error(`Symlink rejected: ${target}`);
    if (item.isDirectory()) { await audit(target); continue; }
    if (!item.isFile() || !mediaMime(target)) throw Error(`Unsupported media: ${target}`);
    const absolute = path.join(root,target), stat = await fs.lstat(absolute);
    if (stat.size > 25 * 1048576) throw Error(`Image exceeds default 25 MB limit: ${target}`);
    const data = await fs.readFile(absolute);
    await validatedImage(data, target, mediaMime(target),25 * 1048576);
    console.log(`${createHash('sha256').update(data).digest('hex')}  ${target}`);
    bytes += data.length; count++;
  }
}
await audit();
console.error(JSON.stringify({ files:count, bytes, result:'valid', modifiedFiles:0 }));
