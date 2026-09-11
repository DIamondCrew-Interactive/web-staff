import 'dotenv/config';
import type { ServerId } from '../src/shared/types.js';

export const serverCatalog: { id: ServerId; name: string }[] = [
  { id: 'prismatic-prod', name: 'Prismatic PROD' },
  { id: 'prismatic-dev', name: 'Prismatic DEV' },
  { id: 'diamond-prod', name: 'DiamondCrew PROD' },
  { id: 'diamond-dev', name: 'DiamondCrew DEV' },
  { id: 'minecraft', name: 'Minecraft' },
  { id: 'dia-01', name: 'DIA-01' },
];
export interface StatusTarget {
  id: ServerId; pterodactylId?: string; fivemUrl?: string; healthUrl?: string; maintenance?: boolean;
}
export function validateUrl(raw: string, httpsOnly = false, originOnly = false): string {
  const u = new URL(raw);
  if (!(httpsOnly ? u.protocol === 'https:' : ['https:', 'http:'].includes(u.protocol)) || u.username || u.password || u.search || u.hash || (originOnly && u.pathname !== '/')) throw new Error('Invalid monitoring URL');
  return originOnly ? u.origin : u.href;
}
export function readTargets(raw = '[]'): StatusTarget[] {
  const items: unknown = JSON.parse(raw);
  if (!Array.isArray(items) || items.length > 6) throw new Error('STATUS_TARGETS must contain at most six entries');
  const ids = new Set<string>();
  return items.map(item => {
    if (!item || typeof item !== 'object' || !serverCatalog.some(s => s.id === item.id) || ids.has(item.id)) throw new Error('Unknown or duplicate status target');
    ids.add(item.id);
    if (item.pterodactylId !== undefined && (typeof item.pterodactylId !== 'string' || !/^[a-zA-Z0-9_-]{1,64}$/.test(item.pterodactylId))) throw new Error('Invalid Pterodactyl identifier');
    if (item.maintenance !== undefined && typeof item.maintenance !== 'boolean') throw new Error('Invalid maintenance flag');
    return { id: item.id, pterodactylId: item.pterodactylId, fivemUrl: item.fivemUrl ? validateUrl(item.fivemUrl, false, true) : undefined, healthUrl: item.healthUrl ? validateUrl(item.healthUrl) : undefined, maintenance: item.maintenance };
  });
}
export const config = {
  variant: process.env.APP_VARIANT || 'staff',
  production: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT || 3000),
  discordClientId: process.env.DISCORD_CLIENT_ID || '',
  discordClientSecret: process.env.DISCORD_CLIENT_SECRET || '',
  discordRedirectUri: process.env.DISCORD_REDIRECT_URI || '',
  discordAllowedIds: new Set((process.env.DISCORD_ALLOWED_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean)),
  sessionSecret: process.env.SESSION_SECRET || '',
  pterodactylUrl: process.env.PTERODACTYL_URL ? validateUrl(process.env.PTERODACTYL_URL, true, true) : '',
  token: process.env.PTERODACTYL_CLIENT_API_KEY || '',
  targets: readTargets(process.env.STATUS_TARGETS),
  incidentTitle: process.env.PUBLIC_INCIDENT_TITLE || '',
  incidentMessage: process.env.PUBLIC_INCIDENT_MESSAGE || '',
  maintenance: process.env.PUBLIC_MAINTENANCE === 'true',
  maintenanceMessage: process.env.PUBLIC_MAINTENANCE_MESSAGE || 'Scheduled maintenance is in progress.',
};
if (!['staff', 'public'].includes(config.variant)) throw new Error('Invalid APP_VARIANT');
export type AppConfig = typeof config;
export function loginAvailable(c: AppConfig): boolean {
  if (!c.discordClientId || !c.discordClientSecret || !c.discordRedirectUri) return false;
  try {
    const u = new URL(c.discordRedirectUri);
    return u.pathname === '/auth/discord/callback' && !u.search && !u.hash && !u.username && !u.password &&
      (u.protocol === 'https:' || (!c.production && u.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(u.hostname)));
  } catch { return false; }
}
