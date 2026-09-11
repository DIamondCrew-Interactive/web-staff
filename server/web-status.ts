import type {WebServiceId, WebServiceStatus} from '../src/shared/types.js';
import {httpStatus, type Fetcher} from './adapters.js';
import {validateUrl} from './config.js';
export const webCatalog: {id:WebServiceId; name:string; public:boolean}[] = [
 {id:'staff-web',name:'Staff Center',public:true},
 {id:'status-web',name:'Service Status',public:true},
 {id:'manager-web',name:'Game Server Management',public:true},
 {id:'controller-web',name:'Server Controller',public:false},
 {id:'proxy-web',name:'Proxy Manager',public:false},
 {id:'image-web',name:'Image Delivery',public:true},
 {id:'prismatic-dev-web',name:'Prismatic DEV Administration',public:false},
];
export interface WebTarget {id:WebServiceId; healthUrl:string; maintenance?:boolean}
export function readWebTargets(raw=process.env.STATUS_WEB_TARGETS || '[]'):WebTarget[] {
 const value:unknown=JSON.parse(raw);if(!Array.isArray(value)||value.length>webCatalog.length)throw Error('Invalid web targets');const ids=new Set<string>();
 return value.map(v=>{if(!v || typeof v!=='object' || !webCatalog.some(s=>s.id===v.id) || ids.has(v.id) || typeof v.healthUrl!=='string' || (v.maintenance!==undefined && typeof v.maintenance!=='boolean') || Object.keys(v).some(k=>!['id','healthUrl','maintenance'].includes(k)))throw Error('Invalid web target');ids.add(v.id);return {id:v.id,healthUrl:validateUrl(v.healthUrl),maintenance:v.maintenance};});
}
export async function readWebStatus(targets:WebTarget[],maintenance:boolean,request:Fetcher):Promise<WebServiceStatus[]> {
 return Promise.all(webCatalog.map(async s=>{const target=targets.find(t=>t.id===s.id);const result=maintenance||target?.maintenance?{state:'MAINTENANCE' as const,players:null,responseMs:null,response:'NOT CONFIGURED' as const}:target?await httpStatus(target.healthUrl,request):{state:'UNKNOWN' as const,players:null,responseMs:null,response:'NOT CONFIGURED' as const};return {id:s.id,name:s.name,...result};}));
}
export function publicWebServices(services:WebServiceStatus[]) {return services.filter(s=>webCatalog.some(item=>item.id===s.id&&item.public));}
