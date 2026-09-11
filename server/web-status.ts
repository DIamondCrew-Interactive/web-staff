import type {WebServiceId, WebServiceStatus} from '../src/shared/types.js';
import {httpStatus, type Fetcher} from './adapters.js';
import {validateUrl} from './config.js';
export const webCatalog: {id:WebServiceId; name:string}[] = [
 {id:'staff-web',name:'DiamondCrew Interactive Staff Center'},
 {id:'status-web',name:'DiamondCrew Interactive Services Status'},
 {id:'manager-web',name:'DiamondCrew Interactive Server Manager'},
 {id:'controller-web',name:'DiamondCrew Interactive Server Controller'},
 {id:'proxy-web',name:'DiamondCrew Interactive Proxy Manager'},
 {id:'image-web',name:'DiamondCrew Interactive Image Service'},
 {id:'prismatic-dev-web',name:'Prismatic DEV Administration'},
];
export interface WebTarget {id:WebServiceId; healthUrl:string; maintenance?:boolean}
export function readWebTargets(raw=process.env.STATUS_WEB_TARGETS || '[]'):WebTarget[] {
 const value:unknown=JSON.parse(raw);if(!Array.isArray(value)||value.length>webCatalog.length)throw Error('Invalid web targets');const ids=new Set<string>();
 return value.map(v=>{if(!v || typeof v!=='object' || !webCatalog.some(s=>s.id===v.id) || ids.has(v.id) || typeof v.healthUrl!=='string' || (v.maintenance!==undefined && typeof v.maintenance!=='boolean') || Object.keys(v).some(k=>!['id','healthUrl','maintenance'].includes(k)))throw Error('Invalid web target');ids.add(v.id);return {id:v.id,healthUrl:validateUrl(v.healthUrl),maintenance:v.maintenance};});
}
export async function readWebStatus(targets:WebTarget[],maintenance:boolean,request:Fetcher):Promise<WebServiceStatus[]> {
 return Promise.all(webCatalog.map(async s=>{const target=targets.find(t=>t.id===s.id);const result=maintenance||target?.maintenance?{state:'MAINTENANCE' as const,players:null,responseMs:null,response:'NOT CONFIGURED' as const}:target?await httpStatus(target.healthUrl,request):{state:'UNKNOWN' as const,players:null,responseMs:null,response:'NOT CONFIGURED' as const};return {id:s.id,name:s.name,...result};}));
}
