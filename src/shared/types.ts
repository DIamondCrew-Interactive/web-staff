export type Status = "OPERATIONAL" | "DEGRADED" | "OFFLINE" | "IN PROGRESS";
export type Category = "management" | "roleplay";
export type IconName = "panel" | "terminal" | "network" | "game";
export interface Service {
  id: string;
  name: string;
  description: string;
  url: string;
  enabled: boolean;
  status: Status;
  category: Category;
  icon: IconName;
  project?: string;
  environment?: "PROD" | "DEV";
}
export interface GameServer {
  id: string;
  name: string;
  project: "Prismatic Roleplay" | "DiamondCrew Roleplay";
  environment: "PROD" | "DEV";
  online: boolean | null;
  players: number | null;
  maxPlayers: number | null;
  cpu: number | null;
  ramMb: number | null;
  uptimeSeconds: number | null;
  port: number;
  node: string;
}
export interface StaffSnapshot {
  mode: "demo" | "live";
  updatedAt: string;
  note: string | null;
  node: {
    name: string;
    online: boolean | null;
    cpu: number | null;
    ramUsedGb: number | null;
    ramTotalGb: number | null;
    diskUsedGb: number | null;
    diskTotalGb: number | null;
    uptimeSeconds: number | null;
  };
  infrastructure: {
    id: string;
    name: string;
    status: Status;
    detail: string;
  }[];
  servers: GameServer[];
}
export interface PublicSnapshot {
  mode: "demo" | "live";
  updatedAt: string;
  overall: Status;
  services: {
    id: string;
    name: string;
    description: string;
    status: Status;
    uptime: number | null;
    history: (Status | null)[];
  }[];
  incident: { title: string; message: string } | null;
  maintenance: { active: boolean; message: string };
}
