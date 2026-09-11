export const accessServices = ['cookbook', 'servercontroller', 'proxymanager', 'image-service'] as const;
export type AccessService = typeof accessServices[number];
export interface AccessUser { id:string; displayName:string; active:boolean; admin:boolean; grants:AccessService[]; epoch:number }
export interface AccessChange { revision:number; at:string; actor:string; action:'bootstrap'|'create'|'update'; subject:string; before:AccessUser|null; after:AccessUser }
export interface AccessSnapshot { schema:1; revision:number; users:Record<string,AccessUser>; audit:AccessChange[] }
export interface AccessView { revision:number; users:AccessUser[]; audit:AccessChange[]; actorId:string; services:readonly AccessService[] }
export interface AccessSession { adminAccess?:boolean; accessManaged?:boolean }
