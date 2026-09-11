import {readFileSync,writeFileSync,renameSync,statSync,mkdirSync,rmdirSync} from 'node:fs';
import {join} from 'node:path';
import type {Express} from 'express';
import type {PublicSnapshot} from '../src/shared/types.js';
import type {HistoryHour,StatusHistory} from '../src/shared/status-history.js';
import {serverCatalog} from './config.js';
import {webCatalog} from './web-status.js';

const HOUR=3600000, HOURS=168;
const ids=new Set<string>([...serverCatalog,...webCatalog].map(s=>s.id));
interface Saved {version:1; lastMinute:number; services:Record<string,HistoryHour[]>}
export class HistoryStore {
  constructor(private directory:string,private now=Date.now) {}
  private read():Saved {
    const path=join(this.directory,'history.json');
    let raw:string;
    try {if(statSync(path).size>2000000)throw Error('History too large');raw=readFileSync(path,'utf8');}
    catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return {version:1,lastMinute:-1,services:{}};throw error;}
    const value=JSON.parse(raw) as Saved;
    if(value.version!==1||!Number.isSafeInteger(value.lastMinute)||value.lastMinute < -1||value.lastMinute>Math.floor(this.now()/60000)||!value.services||typeof value.services!=='object'||Array.isArray(value.services))throw Error('Invalid history');
    for(const [id,rows] of Object.entries(value.services)) {
      if(!ids.has(id)||!Array.isArray(rows)||rows.length>HOURS)throw Error('Invalid history');
      let previous=-Infinity;
      for(const row of rows){const time=Date.parse(row.start);const counts=[row.online,row.offline,row.maintenance,row.unknown];
        if(!Number.isFinite(time)||time%HOUR!==0||time<=previous||counts.some(n=>!Number.isInteger(n)||n<0)||counts.reduce((a,b)=>a+b,0)>60)throw Error('Invalid history');previous=time;}
    }
    return value;
  }
  record(snapshot:PublicSnapshot):void {
    // Exclusive directory lock also works across containers sharing a bind mount.
    // A crash leaves the lock in place: fail closed until an operator removes it.
    const lock=join(this.directory,'collector.lock');mkdirSync(lock,{mode:0o700});
    try {this.recordLocked(snapshot);} finally {rmdirSync(lock);}
  }
  private recordLocked(snapshot:PublicSnapshot):void {
    const value=this.read(),time=this.now(),minute=Math.floor(time/60000),start=new Date(Math.floor(time/HOUR)*HOUR).toISOString();
    if(minute<=value.lastMinute)return;
    // One observation per minute, never interpolate missed measurements.
    const services:Saved['services']={};
    for(const service of [...snapshot.servers,...snapshot.webServices]) {
      if(!ids.has(service.id))continue;
      const rows=(value.services[service.id]||[]).filter(r=>Date.parse(r.start)>=Math.floor(time/HOUR)*HOUR-(HOURS-1)*HOUR);
      let row=rows.find(r=>r.start===start);
      if(!row){row={start,online:0,offline:0,maintenance:0,unknown:0};rows.push(row);}
      row[service.state.toLowerCase() as 'online'|'offline'|'maintenance'|'unknown']++;
      services[service.id]=rows;
    }
    const path=join(this.directory,'history.json'),temp=join(this.directory,'history.json.tmp');
    writeFileSync(temp,JSON.stringify({version:1,lastMinute:minute,services}),{mode:0o600,flush:true});renameSync(temp,path);
  }
  snapshot():StatusHistory {
    const time=this.now(),end=Math.floor(time/HOUR)*HOUR,services:StatusHistory['services']={};
    try {const saved=this.read();for(const id of ids){const byHour=new Map((saved.services[id]||[]).map(r=>[r.start,r]));services[id]=Array.from({length:HOURS},(_,i)=>{const start=new Date(end-(HOURS-1-i)*HOUR).toISOString();const row=byHour.get(start);return {start,online:row?.online||0,offline:row?.offline||0,maintenance:row?.maintenance||0,unknown:row?.unknown||0};});}
      return {available:true,updatedAt:new Date(time).toISOString(),sampledAt:saved.lastMinute>=0?new Date(saved.lastMinute*60000).toISOString():null,stale:saved.lastMinute<0||time-saved.lastMinute*60000>180000,hours:HOURS,services};
    }catch{return {available:false,updatedAt:new Date(time).toISOString(),hours:HOURS,services:{}};}
  }
}
export function mountStatusHistory(app:Express,monitor:()=>Promise<PublicSnapshot>) {
  const directory=process.env.STATUS_HISTORY_DIRECTORY;
  const store=directory?new HistoryStore(directory):undefined;
  app.get('/api/public/history',(_req,res)=>{res.set('Cache-Control','no-store');res.json(store?.snapshot()||{available:false,updatedAt:new Date().toISOString(),hours:HOURS,services:{}});});
  let timer:ReturnType<typeof setInterval>|undefined,busy=false;
  const sample=async()=>{if(busy||!store)return;busy=true;try{store.record(await monitor());}catch{console.error('Status history sample could not be saved');}finally{busy=false;}};
  app.locals.startStatusHistory=()=>{if(store&&process.env.STATUS_HISTORY_COLLECT==='true'&&!timer){void sample();timer=setInterval(()=>void sample(),60000);timer.unref();}};
  app.locals.stopStatusHistory=()=>{if(timer)clearInterval(timer);timer=undefined;};
}
