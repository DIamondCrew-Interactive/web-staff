import { config, serverCatalog, type AppConfig } from './config.js';
import { readStatus, type Fetcher } from './adapters.js';
import type { PublicSnapshot } from '../src/shared/types.js';

export function createMonitor(c: AppConfig = config, request: Fetcher = fetch) {
  let cache: PublicSnapshot | null = null;
  let pending: Promise<PublicSnapshot> | null = null;
  return async (): Promise<PublicSnapshot> => {
    if (cache && Date.now() - Date.parse(cache.updatedAt) < 15000) return cache;
    if (pending) return pending;
    pending = (async () => {
      const servers = await Promise.all(serverCatalog.map(async s => {
        const result = await readStatus(c.targets.find(t => t.id === s.id), c, request);
        // Explicit public projection; never return target objects, URLs, identifiers or upstream JSON.
        return { id: s.id, name: s.name, state: result.state, players: result.players, responseMs: result.responseMs, response: result.response };
      }));
      return { servers, updatedAt: new Date().toISOString(), incident: c.incidentTitle ? { title: c.incidentTitle, message: c.incidentMessage } : null,
        maintenance: { active: c.maintenance, message: c.maintenance ? c.maintenanceMessage : 'No scheduled maintenance.' } };
    })();
    try { cache = await pending; return cache; } finally { pending = null; }
  };
}
