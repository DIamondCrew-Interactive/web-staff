import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {readStatus,httpStatus} from '../server/adapters.js';
import {createMonitor} from '../server/monitoring.js';
import {config} from '../server/config.js';
import {createApp} from '../server/app.js';
import {readWebTargets,publicWebServices} from '../server/web-status.js';
import {launcherConfig} from '../server/launcher.js';

test('launcher has only verified enabled destinations; Proxy is an explicit runtime switch',()=>{
 const defaults=launcherConfig(false);assert.deepEqual(defaults.services.filter(s=>s.enabled).map(s=>s.id),['manager','controller','prismatic-dev','status']);
 for(const id of ['prismatic-prod','diamond-prod','diamond-dev','proxy'])assert.equal(defaults.services.find(s=>s.id===id)?.enabled,false);
 assert.equal(defaults.infrastructureServices.find(s=>s.id==='images')?.enabled,false);
 assert.equal(launcherConfig(true).services.find(s=>s.id==='proxy')?.enabled,true);
 assert.ok(defaults.services.filter(s=>s.enabled).every(s=>new URL(s.url).protocol==='https:'));
});
test('unreachable web probes are OFFLINE, absent sources UNKNOWN, host does not inherit game state',async()=>{
 const c={...config,maintenance:false,targets:[],token:'fixture',pterodactylUrl:'https://private-panel.test'};
 let calls=0;const ok=async()=>{calls++;return new Response(JSON.stringify({attributes:{current_state:'running'}}));};
 assert.equal((await readStatus(undefined,c,ok)).state,'UNKNOWN');
 assert.equal((await readStatus({id:'dia-01',pterodactylId:'unrelated-container',fivemUrl:'https://game.test'},c,ok)).state,'UNKNOWN');assert.equal(calls,0);
 assert.equal((await readStatus({id:'dia-01',healthUrl:'https://host.test/health'},c,ok)).state,'ONLINE');
 const fail=async()=>{throw Error('private internal host');};assert.equal((await httpStatus('https://web.test',fail)).state,'OFFLINE');
 assert.equal((await readStatus({id:'minecraft',pterodactylId:'container'},c,fail)).state,'UNKNOWN');
 const transition=async()=>new Response(JSON.stringify({attributes:{current_state:'starting'}}));assert.equal((await readStatus({id:'minecraft',pterodactylId:'container'},c,transition)).state,'UNKNOWN');
 const targets=readWebTargets('[{"id":"controller-web","healthUrl":"https://private-admin.test/health"},{"id":"staff-web","healthUrl":"https://staff.test/health","maintenance":true}]');
 const result=await createMonitor(c,fail,targets)();assert.equal(result.servers.find(s=>s.id==='dia-01')?.state,'UNKNOWN');assert.equal(result.webServices.find(s=>s.id==='controller-web')?.state,'OFFLINE');assert.equal(result.webServices.find(s=>s.id==='staff-web')?.state,'MAINTENANCE');assert.equal(result.webServices.find(s=>s.id==='manager-web')?.state,'UNKNOWN');
 assert.equal(JSON.stringify(result).includes('private-admin'),false);assert.equal(JSON.stringify(publicWebServices(result.webServices)).includes('controller-web'),false);
 assert.throws(()=>readWebTargets('[{"id":"staff-web","healthUrl":"https://user:secret@private.test"}]'));assert.throws(()=>readWebTargets('[{"id":"unknown","healthUrl":"https://private.test"}]'));
});
test('public endpoint strips private probe identities and never returns upstream URLs, IDs or payloads',async()=>{
 const old=process.env.STATUS_WEB_TARGETS;process.env.STATUS_WEB_TARGETS='[{"id":"controller-web","healthUrl":"http://10.1.2.3/admin-private"},{"id":"image-web","healthUrl":"https://cdn-private.test/health"}]';
 let app;try{app=createApp('public',{...config,maintenance:false,targets:[]},async()=>new Response('PRIVATE_UPSTREAM_CONTAINER'));}finally{if(old===undefined)delete process.env.STATUS_WEB_TARGETS;else process.env.STATUS_WEB_TARGETS=old;}
 const server=app.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${(server.address() as {port:number}).port}`;
 try{const text=await(await fetch(base+'/api/public/status')).text();for(const privateValue of ['10.1.2.3','admin-private','cdn-private','PRIVATE_UPSTREAM_CONTAINER','controller-web','proxy-web','prismatic-dev-web','admin.diamondcrew.net'])assert.equal(text.includes(privateValue),false);
 const result=JSON.parse(text);assert.equal(result.webServices.find((s:any)=>s.id==='image-web').state,'ONLINE');assert.equal((await fetch(base+'/api/launcher')).status,404);
 }finally{await new Promise<void>(r=>server.close(()=>r()));}
});
