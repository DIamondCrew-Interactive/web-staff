import { config } from "./config.js";
import { readGameServer } from "./adapters.js";
import type {
  StaffSnapshot,
  PublicSnapshot,
  Status,
} from "../src/shared/types.js";

const infrastructure = [
  { id: "manager", name: "DiamondCrew Server Manager" },
  { id: "wings", name: "Wings" },
  { id: "database", name: "Database" },
  { id: "redis", name: "Redis" },
  { id: "proxy", name: "Nginx Proxy Manager" },
];
let cache: StaffSnapshot | null = null;
let pending: Promise<StaffSnapshot> | null = null;
export async function getSnapshot(): Promise<StaffSnapshot> {
  if (cache && Date.now() - Date.parse(cache.updatedAt) < 15000) return cache;
  if (pending) return pending;
  pending = collect();
  try {
    cache = await pending;
    return cache;
  } finally {
    pending = null;
  }
}
async function collect(): Promise<StaffSnapshot> {
  const demo = config.mode === "demo";
  const servers = demo
    ? [
        {
          id: "prismatic-dev",
          name: "Prismatic Roleplay",
          project: "Prismatic Roleplay" as const,
          environment: "DEV" as const,
          online: true,
          players: 8,
          maxPlayers: 64,
          cpu: 12.4,
          ramMb: 2437,
          uptimeSeconds: 183720,
          port: 30131,
          node: "DIA-01",
        },
      ]
    : await Promise.all(config.servers.map(readGameServer));
  return {
    mode: demo ? "demo" : "live",
    updatedAt: new Date().toISOString(),
    note: demo
      ? "Preview data · connect monitoring to see live metrics."
      : "Host and infrastructure probes are not connected. Missing readings are shown as unavailable.",
    node: {
      name: "DIA-01",
      online: demo ? true : null,
      cpu: demo ? 24 : null,
      ramUsedGb: demo ? 18.6 : null,
      ramTotalGb: demo ? 64 : null,
      diskUsedGb: demo ? 142 : null,
      diskTotalGb: demo ? 960 : null,
      uptimeSeconds: demo ? 1236060 : null,
    },
    infrastructure: infrastructure.map((s) => ({
      ...s,
      status: demo ? "OPERATIONAL" : "DEGRADED",
      detail: demo ? "Demo reading" : "Monitoring not connected",
    })),
    servers,
  };
}
// Explicit public allowlist. Never spread internal snapshots into public responses.
export function toPublic(snapshot: StaffSnapshot): PublicSnapshot {
  const demo = snapshot.mode === "demo";
  const projectStatus = (project: string): Status => {
    if (demo) return "OPERATIONAL";
    const prod = snapshot.servers.filter(
      (s) => s.project === project && s.environment === "PROD",
    );
    if (!prod.length || prod.some((s) => s.online === null)) return "DEGRADED";
    if (prod.every((s) => s.online === false)) return "OFFLINE";
    return prod.every((s) => s.online) ? "OPERATIONAL" : "DEGRADED";
  };
  const items = [
    {
      id: "diamondcrew",
      name: "DiamondCrew Roleplay",
      description: "The DiamondCrew roleplay experience",
      status: projectStatus("DiamondCrew Roleplay"),
    },
    {
      id: "prismatic",
      name: "Prismatic Roleplay",
      description: "The Prismatic roleplay experience",
      status: projectStatus("Prismatic Roleplay"),
    },
    {
      id: "web",
      name: "Web services",
      description: "Our public websites and community services",
      status: (demo ? "OPERATIONAL" : "DEGRADED") as Status,
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      description: "Core platform availability",
      status: (demo ? "OPERATIONAL" : "DEGRADED") as Status,
    },
  ];
  const incident = config.incidentTitle
    ? { title: config.incidentTitle, message: config.incidentMessage }
    : null;
  return {
    mode: snapshot.mode,
    updatedAt: snapshot.updatedAt,
    overall: config.maintenance
      ? "IN PROGRESS"
      : incident
        ? "DEGRADED"
        : items.every((s) => s.status === "OFFLINE")
          ? "OFFLINE"
          : items.every((s) => s.status === "OPERATIONAL")
            ? "OPERATIONAL"
            : "DEGRADED",
    services: items.map((s) => ({
      ...s,
      uptime: demo ? 100 : null,
      history: Array.from({ length: 60 }, () =>
        demo ? ("OPERATIONAL" as const) : null,
      ),
    })),
    incident,
    maintenance: {
      active: config.maintenance,
      message: config.maintenance
        ? config.maintenanceMessage
        : "No maintenance is currently scheduled.",
    },
  };
}
