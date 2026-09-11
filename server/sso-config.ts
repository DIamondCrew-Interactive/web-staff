import { createPrivateKey, type KeyObject } from 'node:crypto';
import { lstatSync, readFileSync } from 'node:fs';
import path from 'node:path';
export interface SsoClient { id: string; callbackUrl: string; startUrl: string; clientSecret: string; allowedDiscordIds: Set<string> }
export function readPrivateFile(file: string): string {
  if (!path.isAbsolute(file)) throw new Error('SSO credential path must be absolute');
  const stat = lstatSync(file);
  if (!stat.isFile() || stat.size > 65536 || (process.platform !== 'win32' && ((stat.uid !== 0 && stat.uid !== process.getuid!()) || (stat.mode & 0o077)))) throw new Error('SSO credential must be a private regular file owned by root or service account');
  return readFileSync(file, 'utf8');
}
export function readSigningKey(file: string): KeyObject {
  const key = createPrivateKey(readPrivateFile(file));
  if (key.asymmetricKeyType !== 'ed25519') throw new Error('SSO requires Ed25519');
  return key;
}
export function readSsoClients(raw = '[]', production = true): SsoClient[] {
  const items: unknown = JSON.parse(raw);
  if (!Array.isArray(items) || items.length > 20) throw new Error('Invalid SSO clients');
  const ids = new Set<string>(), secrets = new Set<string>();
  const origins: Record<string, string> = { servercontroller: 'https://admin.diamondcrew.net', proxymanager: 'https://proxy.diamondcrew.net', 'image-service': 'https://img.dcrp.cz' };
  return items.map(item => {
    if (!item || typeof item !== 'object' || typeof item.id !== 'string' || !/^[a-z][a-z0-9-]{1,39}$/.test(item.id) || ids.has(item.id)) throw new Error('Invalid SSO client ID');
    ids.add(item.id);
    const url = (value: unknown) => {
      if (typeof value !== 'string') throw new Error('Missing SSO URL');
      const parsed = new URL(value);
      if (parsed.username || parsed.password || parsed.search || parsed.hash || !(parsed.protocol === 'https:' || (!production && parsed.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(parsed.hostname)))) throw new Error('Invalid SSO URL');
      return parsed;
    };
    const callback = url(item.callbackUrl), start = url(item.startUrl);
    if (callback.origin !== start.origin || callback.pathname !== '/auth/sso/callback' || start.pathname !== '/auth/sso/start' || (production && origins[item.id] !== callback.origin)) throw new Error('Invalid SSO callback/start');
    if (typeof item.clientSecret !== 'string' || !/^[A-Za-z0-9_-]{43,128}$/.test(item.clientSecret) || secrets.has(item.clientSecret)) throw new Error('SSO clients require distinct random credentials (32+ bytes)');
    secrets.add(item.clientSecret);
    if (!Array.isArray(item.allowedDiscordIds) || item.allowedDiscordIds.length > 1000 || !item.allowedDiscordIds.every((id: unknown) => typeof id === 'string' && /^\d{17,20}$/.test(id))) throw new Error('Invalid SSO access list');
    return { id: item.id, callbackUrl: callback.href, startUrl: start.href, clientSecret: item.clientSecret, allowedDiscordIds: new Set<string>(item.allowedDiscordIds) };
  });
}
