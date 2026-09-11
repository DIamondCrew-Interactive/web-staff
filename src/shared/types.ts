export type Status = 'OPERATIONAL' | 'DEGRADED' | 'OFFLINE' | 'IN PROGRESS';
export interface Service {
  id: string; name: string; description: string; url: string; enabled: boolean;
  status: Status; category: 'management' | 'roleplay'; icon: 'panel' | 'terminal' | 'network' | 'game';
  project?: string; environment?: 'PROD' | 'DEV';
}
export type ServerState = 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'DEGRADED' | 'UNKNOWN';
export type ServerId = 'prismatic-prod' | 'prismatic-dev' | 'diamond-prod' | 'diamond-dev' | 'minecraft' | 'dia-01';
export interface ServerStatus {
  id: ServerId; name: string; state: ServerState; players: number | null;
  responseMs: number | null; response: 'OK' | 'UNREACHABLE' | 'NOT CONFIGURED' | 'UNAVAILABLE';
}
export interface PublicSnapshot {
  updatedAt: string; servers: ServerStatus[];
  incident: { title: string; message: string } | null;
  maintenance: { active: boolean; message: string };
}
export interface SessionInfo {
  loginAvailable: boolean; authenticated: boolean; internalAccess: boolean;
  user: { username: string } | null; csrfToken?: string;
}
export interface DocEntry { slug: string; title: string }
export interface CookbookEntry extends DocEntry { category: string; categoryTitle: string; order: number; audience: string[]; tags: string[]; headings: { id: string; text: string; depth: number }[] }
export interface CookbookPage extends CookbookEntry { markdown: string }
