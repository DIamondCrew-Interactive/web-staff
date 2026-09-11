import fs from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {accessServices,type AccessService,type AccessUser,type AccessSnapshot} from '../src/shared/access.js';
const idPattern=/^\d{17,20}$/;
const MAX_BYTES=8*1024*1024;
export class AccessError extends Error {constructor(public status:number,message:string){super(message);}}
const unavailable=()=>new AccessError(503,'Access management unavailable');
const exact=(value:Record<string,unknown>,keys:string[])=>Object.keys(value).every(key=>keys.includes(key))&&keys.every(key=>Object.hasOwn(value,key));
function privateDirectory(directory:string){
 if(!path.isAbsolute(directory))throw unavailable();
 const stat=fs.lstatSync(directory);
 if(!stat.isDirectory()||stat.isSymbolicLink()||fs.realpathSync(directory)!==path.resolve(directory)||(process.platform!=='win32'&&((stat.uid!==0&&stat.uid!==process.getuid!())||(stat.mode&0o077))))throw unavailable();
}
function validUser(value:unknown,id:string):value is AccessUser {
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 const u=value as AccessUser;
 return exact(u as unknown as Record<string,unknown>,['id','displayName','active','admin','grants','epoch'])&&u.id===id&&idPattern.test(id)&&typeof u.displayName==='string'&&u.displayName.length<=80&&!/[\p{C}]/u.test(u.displayName)&&typeof u.active==='boolean'&&typeof u.admin==='boolean'&&Number.isSafeInteger(u.epoch)&&u.epoch>=1&&Array.isArray(u.grants)&&u.grants.length<=accessServices.length&&new Set(u.grants).size===u.grants.length&&u.grants.every(g=>accessServices.includes(g));
}
export interface AccessReader { read():AccessSnapshot; user(id:string):AccessUser|undefined; allowed(id:string,service:AccessService):boolean }
export class FileAccessReader implements AccessReader {
 readonly file:string;
 constructor(readonly directory:string){this.file=path.join(directory,'access.json');}
 read():AccessSnapshot {
  try {
   privateDirectory(this.directory);const marker=path.join(this.directory,'.access-initialized');const markerStat=fs.lstatSync(marker);if(!markerStat.isFile()||markerStat.isSymbolicLink()||markerStat.size!==18||(process.platform!=='win32'&&((markerStat.uid!==0&&markerStat.uid!==process.getuid!())||(markerStat.mode&0o077)))||fs.readFileSync(marker,'utf8')!=='managed-access-v1\n')throw unavailable();const stat=fs.lstatSync(this.file);
   if(!stat.isFile()||stat.isSymbolicLink()||stat.size>MAX_BYTES||(process.platform!=='win32'&&((stat.uid!==0&&stat.uid!==process.getuid!())||(stat.mode&0o077))))throw unavailable();
   const s=JSON.parse(fs.readFileSync(this.file,'utf8')) as AccessSnapshot;
   if(!s||typeof s!=='object'||!exact(s as unknown as Record<string,unknown>,['schema','revision','users','audit'])||s.schema!==1||!Number.isSafeInteger(s.revision)||s.revision<1||!s.users||typeof s.users!=='object'||Array.isArray(s.users)||Object.keys(s.users).length>1000||!Object.entries(s.users).every(([id,u])=>validUser(u,id))||!Object.values(s.users).some(u=>u.admin&&u.active)||!Array.isArray(s.audit)||s.audit.length!==s.revision)throw unavailable();
   for(let i=0;i<s.audit.length;i++){const a=s.audit[i];if(!a||a.revision!==i+1||typeof a.at!=='string'||!Number.isFinite(Date.parse(a.at))||!(a.actor==='bootstrap'||idPattern.test(a.actor))||!['bootstrap','create','update'].includes(a.action)||!validUser(a.after,a.subject)||(a.before!==null&&!validUser(a.before,a.subject)))throw unavailable();}
   return s;
  }catch{throw unavailable();}
 }
 user(id:string){return this.read().users[id];}
 allowed(id:string,service:AccessService){const u=this.user(id);return !!u?.active&&u.grants.includes(service);}
}
export interface AccessStoreOptions {directory:string;adminIds:string[];legacy?:Map<string,AccessService[]>;now?:()=>number}
export class AccessStore extends FileAccessReader {
 private now:()=>number;
 constructor(options:AccessStoreOptions){
  super(options.directory);this.now=options.now||Date.now;
  if(!options.adminIds.every(id=>idPattern.test(id))||new Set(options.adminIds).size!==options.adminIds.length)throw unavailable();
  try{privateDirectory(this.directory);if(!fs.existsSync(this.file))this.lock(()=>{if(fs.existsSync(this.file))return;if(fs.existsSync(path.join(this.directory,'.access-initialized')))throw unavailable();if(!options.adminIds.length)throw unavailable();const snapshot:AccessSnapshot={schema:1,revision:0,users:{},audit:[]};const ids=new Set([...options.adminIds,...(options.legacy?.keys()||[])]);if(ids.size>1000)throw unavailable();for(const id of ids){const user:AccessUser={id,displayName:'',active:true,admin:options.adminIds.includes(id),grants:[...new Set(options.legacy?.get(id)||[])],epoch:1};if(!validUser(user,id))throw unavailable();snapshot.users[id]=user;snapshot.audit.push({revision:++snapshot.revision,at:new Date(this.now()).toISOString(),actor:'bootstrap',action:'bootstrap',subject:id,before:null,after:structuredClone(user)});}const marker=fs.openSync(path.join(this.directory,'.access-initialized'),'wx',0o600);try{fs.writeFileSync(marker,'managed-access-v1\n');fs.fsyncSync(marker);}finally{fs.closeSync(marker);}this.write(snapshot);});this.read();}catch{throw unavailable();}
 }
 private lock<T>(action:()=>T):T {
  const lock=path.join(this.directory,'.access-write.lock');let fd:number;
  try{fd=fs.openSync(lock,'wx',0o600);}catch{throw new AccessError(503,'Access writer busy; retry later');}
  try{return action();}finally{fs.closeSync(fd);fs.unlinkSync(lock);}
 }
 private write(snapshot:AccessSnapshot){
  const data=JSON.stringify(snapshot)+'\n';if(Buffer.byteLength(data)>MAX_BYTES)throw new AccessError(503,'Access audit storage limit reached');
  const temp=path.join(this.directory,'.access-'+randomUUID()+'.tmp');let fd:number|undefined;
  try{fd=fs.openSync(temp,'wx',0o600);fs.writeFileSync(fd,data,'utf8');fs.fsyncSync(fd);fs.closeSync(fd);fd=undefined;fs.renameSync(temp,this.file);if(process.platform!=='win32'){const directory=fs.openSync(this.directory,'r');try{fs.fsyncSync(directory);}finally{fs.closeSync(directory);}}}
  finally{if(fd!==undefined)fs.closeSync(fd);if(fs.existsSync(temp))fs.unlinkSync(temp);}
 }
 update(actor:string,id:string,input:unknown){
  if(!idPattern.test(id)||!input||typeof input!=='object'||Array.isArray(input))throw new AccessError(400,'Invalid access profile');
  const value=input as Record<string,unknown>;
  if(!exact(value,['expectedRevision','displayName','active','admin','grants'])||!Number.isSafeInteger(value.expectedRevision))throw new AccessError(400,'Invalid access profile');
  return this.lock(()=>{
   const snapshot=this.read();if(!snapshot.users[actor]?.active||!snapshot.users[actor]?.admin)throw new AccessError(403,'Administrator access required');
   if(value.expectedRevision!==snapshot.revision)throw new AccessError(409,'Access changed. Reload and review before saving.');
   const before=snapshot.users[id]||null;
   const after={id,displayName:value.displayName,active:value.active,admin:value.admin,grants:value.grants,epoch:before?.epoch||1} as AccessUser;
   if(!validUser(after,id))throw new AccessError(400,'Invalid access profile');
   if(id===actor&&(!after.active||!after.admin))throw new AccessError(409,'You cannot block or remove your own administrator access');
   if(!before&&Object.keys(snapshot.users).length>=1000)throw new AccessError(409,'User limit reached');
   if(before&&(before.active!==after.active||before.admin!==after.admin||JSON.stringify([...before.grants].sort())!==JSON.stringify([...after.grants].sort())))after.epoch++;
   snapshot.users[id]=after;if(!Object.values(snapshot.users).some(u=>u.active&&u.admin))throw new AccessError(409,'At least one active administrator is required');
   snapshot.audit.push({revision:++snapshot.revision,at:new Date(this.now()).toISOString(),actor,action:before?'update':'create',subject:id,before,after:structuredClone(after)});this.write(snapshot);return snapshot;
  });
 }
}
export function imageAccessReader():AccessReader|undefined {const directory=process.env.IMAGE_ACCESS_STORE_DIRECTORY;if(!directory)return;const reader=new FileAccessReader(directory);reader.read();return reader;}
