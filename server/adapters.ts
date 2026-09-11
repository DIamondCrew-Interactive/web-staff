import type { AppConfig, StatusTarget } from './config.js';
import type { ServerStatus } from '../src/shared/types.js';

type Probe = Pick<ServerStatus, 'state' | 'players' | 'responseMs' | 'response'>;
const unavailable = (): Probe => ({ state: 'UNKNOWN', players: null, responseMs: null, response: 'UNAVAILABLE' });
export type Fetcher = typeof fetch;
export async function pterodactylStatus(id: string, c: AppConfig, request: Fetcher = fetch): Promise<Probe> {
  if (!c.pterodactylUrl || !c.token) return { ...unavailable(), response: 'NOT CONFIGURED' };
  const start = performance.now();
  try {
    const res = await request(`${c.pterodactylUrl}/api/client/servers/${encodeURIComponent(id)}/resources`, {
      headers: { Accept: 'application/json', Authorization: `Bearer ${c.token}` }, redirect: 'error', signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return unavailable(); // API permission/outage is not proof a game server is offline.
    const data = await res.json();
    const state = data?.attributes?.current_state;
    if (!['running', 'offline', 'starting', 'stopping'].includes(state)) return unavailable();
    return { state: state === 'running' ? 'ONLINE' : state === 'offline' ? 'OFFLINE' : 'UNKNOWN', players: null, responseMs: Math.round(performance.now() - start), response: 'OK' };
  } catch { return unavailable(); }
}
export async function fivemStatus(origin: string, request: Fetcher = fetch): Promise<Probe> {
  const start = performance.now();
  try {
    const res = await request(`${origin}/players.json`, { redirect: 'error', signal: AbortSignal.timeout(5000), headers: { Accept: 'application/json' } });
    if (!res.ok) return unavailable();
    const players = await res.json();
    if (!Array.isArray(players)) return unavailable();
    return { state: 'ONLINE', players: players.length, responseMs: Math.round(performance.now() - start), response: 'OK' };
  } catch { return unavailable(); }
}
export async function httpStatus(url: string, request: Fetcher = fetch): Promise<Probe> {
  const start = performance.now();
  try {
    const res = await request(url, { redirect: 'error', signal: AbortSignal.timeout(5000) });
    await res.body?.cancel();
    return { state: res.ok ? 'ONLINE' : 'OFFLINE', players: null, responseMs: Math.round(performance.now() - start), response: res.ok ? 'OK' : 'UNREACHABLE' };
  } catch { return { state: 'OFFLINE', players: null, responseMs: null, response: 'UNREACHABLE' }; }
}
export async function readStatus(target: StatusTarget | undefined, c: AppConfig, request: Fetcher = fetch): Promise<Probe> {
  if (c.maintenance || target?.maintenance) return { state: 'MAINTENANCE', players: null, responseMs: null, response: 'NOT CONFIGURED' };
  if (!target) return { ...unavailable(), response: 'NOT CONFIGURED' };
  // Host health is independent of game/container state and unrelated web availability.
  if (target.id === 'dia-01') return target.healthUrl ? httpStatus(target.healthUrl, request) : {...unavailable(), response:'NOT CONFIGURED'};
  // Pterodactyl is authoritative when configured; FiveM may supplement player count.
  const [panel, fivem, http] = await Promise.all([
    target.pterodactylId ? pterodactylStatus(target.pterodactylId, c, request) : null,
    target.fivemUrl ? fivemStatus(target.fivemUrl, request) : null,
    target.healthUrl ? httpStatus(target.healthUrl, request) : null,
  ]);
  const primary = panel ?? fivem ?? http ?? { ...unavailable(), response: 'NOT CONFIGURED' as const };
  return { ...primary, players: primary.state === 'ONLINE' ? fivem?.players ?? null : null };
}
