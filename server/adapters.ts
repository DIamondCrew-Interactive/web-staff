import { config, type MonitoredServer } from "./config.js";
import type { GameServer } from "../src/shared/types.js";

// Only server-controlled origins and IDs are accepted. No proxy URL comes from a request.
async function fetchJson(url: string, token?: string): Promise<any> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(5000),
    redirect: "error",
  });
  if (!response.ok) throw new Error("Upstream monitoring unavailable");
  return response.json();
}
const metric = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : null;
export async function readGameServer(
  server: MonitoredServer,
): Promise<GameServer> {
  const result: GameServer = {
    id: server.id,
    name: server.name,
    project: server.project,
    environment: server.environment,
    node: server.node,
    port: server.port,
    online: null,
    cpu: null,
    ramMb: null,
    uptimeSeconds: null,
    players: null,
    maxPlayers: null,
  };
  await Promise.allSettled([
    (async () => {
      if (!config.pterodactylUrl || !config.token) return;
      const data = await fetchJson(
        `${config.pterodactylUrl}/api/client/servers/${encodeURIComponent(server.id)}/resources`,
        config.token,
      );
      const state = data?.attributes?.current_state;
      result.online =
        state === "running" ? true : state === "offline" ? false : null;
      const r = data?.attributes?.resources;
      result.cpu = metric(r?.cpu_absolute);
      const ram = metric(r?.memory_bytes),
        uptime = metric(r?.uptime);
      result.ramMb = ram === null ? null : ram / 1024 / 1024;
      result.uptimeSeconds = uptime === null ? null : uptime / 1000;
    })(),
    (async () => {
      if (!server.fivemUrl) return;
      // Only the count is retained; player identifiers and names never reach our API.
      const base = new URL(server.fivemUrl).origin;
      const [players, info] = await Promise.all([
        fetchJson(`${base}/players.json`),
        fetchJson(`${base}/info.json`),
      ]);
      if (Array.isArray(players)) result.players = players.length;
      const max = Number(
        info?.vars?.sv_maxClients ?? info?.vars?.sv_maxclients,
      );
      result.maxPlayers = Number.isFinite(max) && max > 0 ? max : null;
    })(),
  ]);
  return result;
}
