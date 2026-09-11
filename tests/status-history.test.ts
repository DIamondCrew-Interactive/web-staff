import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,writeFileSync,readFileSync,mkdirSync,rmdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {HistoryStore} from '../server/status-history.js';
import type {PublicSnapshot,ServerState} from '../src/shared/types.js';
function fixture(state:ServerState):PublicSnapshot{return {updatedAt:new Date().toISOString(),servers:[{id:'prismatic-dev',name:'Prismatic DEV',state,players:null,responseMs:null,response:'OK'}],webServices:[],incident:null,maintenance:{active:false,message:''}};}
test('hourly history records once per minute, persists across restarts, leaves gaps empty and expires old buckets',()=>{
 const dir=mkdtempSync(join(tmpdir(),'dci-history-'));let time=Date.UTC(2026,8,11,10,5);const store=new HistoryStore(dir,()=>time);
 try{assert.equal(store.snapshot().services['prismatic-dev'].at(-1)?.online,0);store.record(fixture('ONLINE'));store.record(fixture('OFFLINE'));time+=60000;store.record(fixture('OFFLINE'));
 const restarted=new HistoryStore(dir,()=>time);assert.deepEqual(restarted.snapshot().services['prismatic-dev'].at(-1),{start:'2026-09-11T10:00:00.000Z',online:1,offline:1,maintenance:0,unknown:0});
 time+=3*3600000;restarted.record(fixture('UNKNOWN'));const rows=restarted.snapshot().services['prismatic-dev'];assert.equal(rows.at(-2)?.online,0);assert.equal(rows.at(-2)?.unknown,0);assert.equal(rows.at(-1)?.unknown,1);
 time+=8*24*3600000;restarted.record(fixture('MAINTENANCE'));assert.equal(restarted.snapshot().services['prismatic-dev'].reduce((n,r)=>n+r.online+r.offline,0),0);assert.equal(JSON.parse(readFileSync(join(dir,'history.json'),'utf8')).services['prismatic-dev'].length,1);
 }finally{rmSync(dir,{recursive:true,force:true});}
});
test('malformed history is unavailable and never silently replaced or exposed',()=>{
 const dir=mkdtempSync(join(tmpdir(),'dci-history-'));const store=new HistoryStore(dir);
 try{for(const raw of ['private-secret',JSON.stringify({version:1,lastMinute:0,services:{'private-server':[]}}),JSON.stringify({version:1,lastMinute:0,services:{'prismatic-dev':[{start:'2026-09-11T10:00:00.000Z',online:61,offline:0,maintenance:0,unknown:0}]}})]){
 writeFileSync(join(dir,'history.json'),raw);assert.equal(store.snapshot().available,false);assert.deepEqual(store.snapshot().services,{});assert.throws(()=>store.record(fixture('ONLINE')));assert.equal(readFileSync(join(dir,'history.json'),'utf8'),raw);}
 }finally{rmSync(dir,{recursive:true,force:true});}
});
test('collector lock prevents competing writes and stale samples are explicit',()=>{
 const dir=mkdtempSync(join(tmpdir(),'dci-history-'));let time=Date.UTC(2026,8,11,10);const store=new HistoryStore(dir,()=>time);
 try{store.record(fixture('ONLINE'));const before=readFileSync(join(dir,'history.json'),'utf8');mkdirSync(join(dir,'collector.lock'));time+=60000;assert.throws(()=>store.record(fixture('OFFLINE')));assert.equal(readFileSync(join(dir,'history.json'),'utf8'),before);rmdirSync(join(dir,'collector.lock'));
 time+=180000;assert.equal(store.snapshot().stale,true);assert.equal(store.snapshot().sampledAt,'2026-09-11T10:00:00.000Z');store.record(fixture('OFFLINE'));assert.equal(store.snapshot().stale,false);
 const future=JSON.parse(readFileSync(join(dir,'history.json'),'utf8'));future.lastMinute+=1000;writeFileSync(join(dir,'history.json'),JSON.stringify(future));assert.equal(store.snapshot().available,false);assert.throws(()=>store.record(fixture('ONLINE')));
 }finally{rmSync(dir,{recursive:true,force:true});}
});
