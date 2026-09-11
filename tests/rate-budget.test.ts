import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import {once} from 'node:events';
import {generateKeyPairSync,randomBytes,createHash} from 'node:crypto';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createRateBudget} from '../server/rate-budget.js';
import {createAuth} from '../server/auth.js';
import {createApp} from '../server/app.js';
import {createImageAuth} from '../server/media/sso-auth.js';
import {config} from '../server/config.js';
import {readSsoClients} from '../server/sso-config.js';
import {mockImageBroker} from './fixtures/image-broker.js';
const nonce=()=>randomBytes(32).toString('base64url'),id='111111111111111111';
const authConfig=()=>({...config,production:false,discordClientId:id,discordClientSecret:'fixture-only',discordRedirectUri:'https://staff.diamondcrew.net/auth/discord/callback'});
const listen=async(app:express.Express)=>{const server=app.listen(0,'127.0.0.1');await once(server,'listening');return {base:`http://127.0.0.1:${(server.address() as {port:number}).port}`,close:()=>new Promise<void>(r=>server.close(()=>r()))};};

test('rate counters preserve independent existing buckets at capacity and expire',()=>{
 let time=0;const allow=createRateBudget(2,()=>time,1000,2);
 assert.equal(allow('a'),true);assert.equal(allow('a'),true);assert.equal(allow('a'),false);
 assert.equal(allow('b'),true);assert.equal(allow('c'),false);assert.equal(allow('b'),true);
 time=1000;assert.equal(allow('c'),true);assert.equal(allow('a'),true);
});
test('one trusted client IP cannot exhaust Staff OAuth starts for another; untrusted XFF is ignored',async()=>{
 const app=express();app.set('trust proxy','loopback');createAuth(authConfig()).mount(app);const f=await listen(app);
 try{for(let i=0;i<61;i++){const r=await fetch(f.base+'/auth/discord',{redirect:'manual',headers:{'X-Forwarded-For':'192.0.2.1'}});assert.equal(r.status,i<60?302:429);}assert.equal((await fetch(f.base+'/auth/discord',{redirect:'manual',headers:{'X-Forwarded-For':'192.0.2.2'}})).status,302);}finally{await f.close();}
 const untrusted=express();createAuth(authConfig()).mount(untrusted);const g=await listen(untrusted);
 try{for(let i=0;i<61;i++){const r=await fetch(g.base+'/auth/discord',{redirect:'manual',headers:{'X-Forwarded-For':`192.0.2.${i+1}`}});assert.equal(r.status,i<60?302:429);}}finally{await g.close();}
});
test('Image starts are limited per trusted client IP rather than globally',async()=>{
 const app=express();app.set('trust proxy','loopback');createImageAuth(false,mockImageBroker().config).mount(app);const f=await listen(app);
 try{for(let i=0;i<121;i++){const r=await fetch(f.base+'/auth/sso/start',{redirect:'manual',headers:{'X-Forwarded-For':'192.0.2.1'}});assert.equal(r.status,i<120?303:429);}assert.equal((await fetch(f.base+'/auth/sso/start',{redirect:'manual',headers:{'X-Forwarded-For':'192.0.2.2'}})).status,303);}finally{await f.close();}
});
test('invalid clients cannot spend authenticated redemption quota, and clients have separate budgets',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'dc-rate-test-')),file=path.join(root,'sign.pem');const keys=generateKeyPairSync('ed25519');await writeFile(file,keys.privateKey.export({type:'pkcs8',format:'pem'}),{mode:0o600});
 const secrets=[nonce(),nonce()];const clients=readSsoClients(JSON.stringify(['servercontroller','proxymanager'].map((name,i)=>({id:name,callbackUrl:`https://${i?'proxy':'admin'}.diamondcrew.net/auth/sso/callback`,startUrl:`https://${i?'proxy':'admin'}.diamondcrew.net/auth/sso/start`,clientSecret:secrets[i],allowedDiscordIds:[id]}))));const now=Date.now();
 const c={...authConfig(),sessionSecret:nonce(),ssoEnabled:true,ssoKeyId:'fixture',ssoPrivateKeyFile:file,ssoClients:clients,targets:[]};
 const app=createApp('staff',c,async()=>new Response(JSON.stringify({token_type:'Bearer',access_token:'fixture',id,username:'test'})),()=>now);const f=await listen(app);
 try{
 const start=await fetch(f.base+'/auth/discord',{redirect:'manual'});const state=new URL(start.headers.get('location')!).searchParams.get('state');const logged=await fetch(f.base+'/auth/discord/callback?code=fixture&state='+state,{redirect:'manual',headers:{Cookie:start.headers.getSetCookie()[0].split(';')[0]}});const cookie=logged.headers.getSetCookie().find(s=>s.startsWith('dc_session='))!.split(';')[0];
 const flowState=nonce(),verifier=nonce(),challenge=createHash('sha256').update(verifier).digest('base64url');
 const issue=async(audience:string)=>{const r=await fetch(f.base+`/sso/${audience}?state=${flowState}&code_challenge=${challenge}`,{redirect:'manual',headers:{Cookie:cookie}});assert.equal(r.status,303);return new URL(r.headers.get('location')!).searchParams.get('ticket')!;};
 const redeem=(ticket:string,audience:string,secret:string)=>fetch(f.base+'/sso/api/redeem',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+secret},body:JSON.stringify({ticket,audience,state:flowState,code_verifier:verifier})});
 const ticket=await issue('servercontroller');
 for(let i=0;i<650;i++){const r=await redeem(nonce(),'servercontroller','invalid');assert.equal(r.status,i<60?401:429);}
 assert.equal((await redeem(ticket,'servercontroller',secrets[0])).status,200);
 // One valid request already used the controller bucket. Malformed grants from a
 // credentialed client count only against that client, never a different service.
 for(let i=0;i<600;i++){const r=await redeem(nonce(),'servercontroller',secrets[0]);assert.equal(r.status,i<599?400:429);}
 const proxyTicket=await issue('proxymanager');assert.equal((await redeem(proxyTicket,'proxymanager',secrets[1])).status,200);
 }finally{await f.close();await rm(root,{recursive:true});}
});

test('trusted proxy config admits only IP/CIDR peers and unknown peers cannot spoof XFF',async()=>{
 const {configureTrustedProxy,readTrustedProxyCidrs}=await import('../server/trusted-proxy.js');
 for(const invalid of ['true','1','loopback','proxy.example','0.0.0.0/0','::/0','192.0.2.1/33','::1/129','192.0.2.1,'])assert.throws(()=>readTrustedProxyCidrs(invalid));
 assert.deepEqual(readTrustedProxyCidrs('127.0.0.1/32,::1/128'),['127.0.0.1/32','::1/128']);
 for(const [trusted,expected] of [['127.0.0.1/32','192.0.2.42'],['192.0.2.1/32','127.0.0.1']]){
  const app=express();configureTrustedProxy(app,trusted);app.get('/',(req,res)=>res.json({ip:req.ip}));const f=await listen(app);
  try{assert.equal((await(await fetch(f.base,{headers:{'X-Forwarded-For':'198.51.100.9, 192.0.2.42'}})).json()).ip,expected);}finally{await f.close();}
 }
});
