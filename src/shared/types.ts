export type Status = 'OPERATIONAL' | 'DEGRADED' | 'OFFLINE' | 'IN PROGRESS';
export interface Service {
  id: string; name: string; description: string; url: string; enabled: boolean;
  status: Status; category: 'management' | 'roleplay' | 'infrastructure'; icon: 'panel' | 'terminal' | 'network' | 'game' | 'status' | 'image';
  logo?: string; visual?: string;
  project?: string; environment?: 'PROD' | 'DEV';
}
export type ServerState = 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'UNKNOWN';
export type ServerId = 'prismatic-prod' | 'prismatic-dev' | 'diamond-prod' | 'diamond-dev' | 'minecraft' | 'dia-01';
export interface ServerStatus {
  id: ServerId; name: string; state: ServerState; players: number | null;
  responseMs: number | null; response: 'OK' | 'UNREACHABLE' | 'NOT CONFIGURED' | 'UNAVAILABLE';
}
export type WebServiceId = 'staff-web' | 'status-web' | 'manager-web' | 'controller-web' | 'proxy-web' | 'image-web' | 'prismatic-dev-web';
export interface WebServiceStatus extends Omit<ServerStatus, 'id'> {id:WebServiceId}
export interface PublicSnapshot {
  updatedAt: string; servers: ServerStatus[]; webServices: WebServiceStatus[];
  incident: { title: string; message: string } | null;
  maintenance: { active: boolean; message: string };
}
export interface SessionInfo {
  loginAvailable: boolean; authenticated: boolean; internalAccess: boolean;
  user: { username: string; displayName?: string; avatarUrl?: string } | null; csrfToken?: string;
}
export interface DocEntry { slug: string; title: string }
export interface CookbookEntry extends DocEntry { category: string; categoryTitle: string; order: number; audience: string[]; tags: string[]; headings: { id: string; text: string; depth: number }[] }
export interface CookbookPage extends CookbookEntry { markdown: string }
