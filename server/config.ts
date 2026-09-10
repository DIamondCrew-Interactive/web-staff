import "dotenv/config";

export interface MonitoredServer {
  id: string;
  name: string;
  project: "Prismatic Roleplay" | "DiamondCrew Roleplay";
  environment: "PROD" | "DEV";
  port: number;
  node: string;
  fivemUrl?: string;
}
export function readServers(raw: string | undefined): MonitoredServer[] {
  if (!raw) return [];
  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value) || value.length > 30)
    throw new Error(
      "PTERODACTYL_SERVERS must be an array of at most 30 servers",
    );
  const ids = new Set<string>();
  return value.map((item) => {
    if (!item || typeof item !== "object")
      throw new Error("Invalid server entry");
    const s = item as Record<string, unknown>;
    if (
      typeof s.id !== "string" ||
      !/^[a-zA-Z0-9_-]{1,64}$/.test(s.id) ||
      ids.has(s.id) ||
      typeof s.name !== "string" ||
      !s.name ||
      typeof s.node !== "string" ||
      !["Prismatic Roleplay", "DiamondCrew Roleplay"].includes(
        String(s.project),
      ) ||
      !["PROD", "DEV"].includes(String(s.environment)) ||
      !Number.isInteger(s.port) ||
      Number(s.port) < 1 ||
      Number(s.port) > 65535
    )
      throw new Error("Invalid server configuration");
    if (s.fivemUrl !== undefined) validateBaseUrl(String(s.fivemUrl), false);
    ids.add(s.id);
    return {
      id: s.id,
      name: s.name,
      node: s.node,
      project: s.project,
      environment: s.environment,
      port: s.port,
      ...(s.fivemUrl ? { fivemUrl: s.fivemUrl } : {}),
    } as MonitoredServer;
  });
}
export function validateBaseUrl(raw: string, requireHttps: boolean): string {
  const url = new URL(raw);
  if (
    !(requireHttps
      ? url.protocol === "https:"
      : ["http:", "https:"].includes(url.protocol)) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  )
    throw new Error(
      "Monitoring URL must be a base origin without credentials, path or query",
    );
  return url.origin;
}
export const config = {
  variant: process.env.APP_VARIANT || "staff",
  mode: process.env.DATA_MODE || "demo",
  production: process.env.NODE_ENV === "production",
  port: Number(process.env.PORT || 3000),
  username: process.env.STAFF_USERNAME || "",
  password: process.env.STAFF_PASSWORD || "",
  pterodactylUrl: process.env.PTERODACTYL_URL
    ? validateBaseUrl(process.env.PTERODACTYL_URL, true)
    : "",
  token: process.env.PTERODACTYL_CLIENT_API_KEY || "",
  servers: readServers(process.env.PTERODACTYL_SERVERS),
  incidentTitle: process.env.PUBLIC_INCIDENT_TITLE || "",
  incidentMessage: process.env.PUBLIC_INCIDENT_MESSAGE || "",
  maintenance: process.env.PUBLIC_MAINTENANCE === "true",
  maintenanceMessage:
    process.env.PUBLIC_MAINTENANCE_MESSAGE ||
    "Scheduled maintenance is in progress. Some services may be temporarily unavailable.",
};
if (
  !["staff", "public"].includes(config.variant) ||
  !["demo", "live"].includes(config.mode)
)
  throw new Error("Invalid APP_VARIANT or DATA_MODE");
if (
  config.production &&
  config.variant === "staff" &&
  (!config.username || config.password.length < 20)
)
  throw new Error(
    "Production staff requires STAFF_USERNAME and STAFF_PASSWORD (20+ characters)",
  );
