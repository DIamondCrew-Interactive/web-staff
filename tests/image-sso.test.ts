import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync, randomUUID} from 'node:crypto';
import {mkdtemp,writeFile,rm,mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {once} from 'node:events';
import {createApp} from '../server/app.js';
import {config} from '../server/config.js';
import {createImageApp,mediaErrorHandler} from '../server/media/app.js';
import {parseImageSsoConfig,verifyImageAssertion} from '../server/media/sso-auth.js';
import {readSsoClients} from '../server/sso-config.js';
import {mockImageBroker,testNonce} from './fixtures/image-broker.js';
const id='111111111111111111';
const media=(root:string)=>({root,publicOrigin:'https://img.dcrp.cz',maxUploadBytes:1048576,maxBatchBytes:2097152,maxFiles:3,cacheSeconds:300});
test('Image verification rejects unsigned, wrong audience, issuer, expired, future, overlong lifetime, forged key and unauthorized subject',()=>{
 let time=Date.now();const broker=mockImageBroker(()=>time),state=testNonce();
 assert.equal(verifyImageAssertion(broker.assertion(state),state,broker.config,()=>time).sub,id);
 for(const overrides of [{aud:'servercontroller'},{iss:'https://evil.test'},{sub:'222222222222222222'},{sub:111111111111111111},{exp:Math.floor(time/1000)},{iat:Math.floor(time/1000)+6},{exp:Math.floor(time/1000)+46},{state:testNonce()},{jti:'bad'}])assert.throws(()=>verifyImageAssertion(broker.assertion(state,overrides),state,broker.config,()=>time));
 for(const header of [{alg:'none'},{alg:'HS256'},{typ:'DCI-SSO'},{kid:'unknown'},{jku:'https://evil.test/key'}])assert.throws(()=>verifyImageAssertion(broker.assertion(state,{},header),state,broker.config,()=>time));
 const jwt=broker.assertion(state);assert.throws(()=>verifyImageAssertion(jwt.split('.').slice(0,2).join('.')+'.',state,broker.config));assert.throws(()=>verifyImageAssertion(mockImageBroker().assertion(state),state,broker.config));
 assert.throws(()=>parseImageSsoConfig({redeem_secret:testNonce(),verification_keys:{},allowed_ids:[]}));
 const privateKey=generateKeyPairSync('ed25519').privateKey.export({type:'pkcs8',format:'pem'});assert.throws(()=>parseImageSsoConfig({redeem_secret:testNonce(),verification_keys:{key:privateKey},allowed_ids:[id]}));
});
test('Image callback is browser-bound, single-use, rechecks signed assertion and rejects duplicate jti',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'dc-image-sso-'));let time=Date.now();const broker=mockImageBroker(()=>time);let override:object={},header:object={},calls=0;
 const transport=async(_input:unknown,init?:RequestInit)=>{calls++;const {state}=JSON.parse(String(init?.body));return new Response(JSON.stringify({assertion:broker.assertion(state,override,header),token_type:'DCI-SSO',expires_in:45}));};
 const {app,publicFiles}=await createImageApp({...config,production:false},media(root),transport,undefined,broker.config,()=>time);app.use(publicFiles);app.use(mediaErrorHandler);const server=app.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${(server.address() as {port:number}).port}`;
 const start=async()=>{const r=await fetch(base+'/auth/sso/start',{redirect:'manual'});const url=new URL(r.headers.get('location')!);return {state:url.searchParams.get('state')!,cookie:r.headers.getSetCookie()[0].split(';')[0]};};
 const callback=(flow:{state:string;cookie:string})=>fetch(base+`/auth/sso/callback?ticket=${testNonce()}&state=${flow.state}`,{redirect:'manual',headers:{Cookie:flow.cookie}});
 try{
 const flow=await start();assert.equal((await callback({...flow,cookie:''})).status,400);assert.equal(calls,0);
 const winner=await Promise.all([callback(flow),callback(flow)]);assert.deepEqual(winner.map(r=>r.status).sort(),[303,400]);assert.equal(calls,1);
 for(const bad of [{aud:'proxymanager'},{exp:Math.floor(time/1000)},{sub:'222222222222222222'}]){override=bad;assert.equal((await callback(await start())).status,403);}
 override={};header={alg:'none'};assert.equal((await callback(await start())).status,403);header={};
 const jti=randomUUID();override={jti};assert.equal((await callback(await start())).status,303);assert.equal((await callback(await start())).status,403);override={};
 const expired=await start();time+=300001;const before=calls;assert.equal((await callback(expired)).status,400);assert.equal(calls,before);
 const wrong=await start();assert.equal((await callback({...wrong,state:testNonce()})).status,400);assert.equal((await callback(wrong)).status,400);
 assert.equal((await fetch(base+'/auth/discord',{redirect:'manual'})).status,404);
 }finally{await new Promise<void>(r=>server.close(()=>r()));await rm(root,{recursive:true});}
});
test('Staff broker to Image native session interoperates; public files survive logout',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'dc-image-integration-')),keyfile=path.join(root,'sign.pem');const keys=generateKeyPairSync('ed25519');await writeFile(keyfile,keys.privateKey.export({type:'pkcs8',format:'pem'}),{mode:0o600});
 const secret=testNonce(),kid='integration',imageConfig=parseImageSsoConfig({redeem_secret:secret,verification_keys:{[kid]:keys.publicKey.export({type:'spki',format:'pem'})},allowed_ids:[id]});
 const staff=createApp('staff',{...config,production:false,sessionSecret:testNonce(),ssoEnabled:true,ssoPrivateKeyFile:keyfile,ssoKeyId:kid,ssoClients:readSsoClients(JSON.stringify([{id:'image-service',clientSecret:secret,callbackUrl:'https://img.dcrp.cz/auth/sso/callback',startUrl:'https://img.dcrp.cz/auth/sso/start',allowedDiscordIds:[id]}])),discordClientId:id,discordClientSecret:'test-only',discordRedirectUri:'http://localhost/auth/discord/callback'},async()=>new Response(JSON.stringify({token_type:'Bearer',access_token:'fixture',id,username:'test'})));
 const staffServer=staff.listen(0,'127.0.0.1');await once(staffServer,'listening');const staffBase=`http://127.0.0.1:${(staffServer.address() as {port:number}).port}`;
 const mediaRoot=path.join(root,'media');await mkdir(mediaRoot);const transport=async(input:unknown,init?:RequestInit)=>{assert.equal(String(input),'https://staff.diamondcrew.net/sso/api/redeem');return fetch(staffBase+'/sso/api/redeem',init);};
 const {app,publicFiles}=await createImageApp({...config,production:true},media(mediaRoot),transport,undefined,imageConfig);app.use(publicFiles);app.use(mediaErrorHandler);const imageServer=app.listen(0,'127.0.0.1');await once(imageServer,'listening');const base=`http://127.0.0.1:${(imageServer.address() as {port:number}).port}`;
 try{
 await writeFile(path.join(mediaRoot,'existing.png'),Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/g0sAAAAASUVORK5CYII=','base64'));
 assert.equal((await fetch(base+'/existing.png')).status,200);
 const start=await fetch(base+'/auth/sso/start',{redirect:'manual'});const txCookie=start.headers.getSetCookie()[0];assert.match(txCookie,/HttpOnly/);assert.match(txCookie,/Secure/);assert.match(txCookie,/SameSite=Lax/);assert.match(txCookie,/^__Host-dci_image_sso=/);
 const location=new URL(start.headers.get('location')!);const oauth=await fetch(staffBase+location.pathname+location.search,{redirect:'manual'});const oauthUrl=new URL(oauth.headers.get('location')!);
 const logged=await fetch(staffBase+'/auth/discord/callback?code=fixture&state='+oauthUrl.searchParams.get('state'),{redirect:'manual',headers:{Cookie:oauth.headers.getSetCookie()[0].split(';')[0]}});
 const staffCookie=logged.headers.getSetCookie().find(s=>s.startsWith('dc_session='))!.split(';')[0];
 const issue=await fetch(staffBase+logged.headers.get('location'),{redirect:'manual',headers:{Cookie:staffCookie}});assert.equal(issue.status,303);const target=new URL(issue.headers.get('location')!);assert.equal(target.origin,'https://img.dcrp.cz');
 const callback=await fetch(base+target.pathname+target.search,{redirect:'manual',headers:{Cookie:txCookie.split(';')[0]}});assert.equal(callback.status,303);assert.equal(callback.headers.get('location'),'/manage');const native=callback.headers.getSetCookie().find(s=>s.startsWith('__Host-dci_image_session='))!;assert.match(native,/HttpOnly/);assert.match(native,/Secure/);assert.match(native,/SameSite=Lax/);const cookie=native.split(';')[0];
 const session=await(await fetch(base+'/api/session',{headers:{Cookie:cookie}})).json();assert.equal(session.internalAccess,true);assert.equal(JSON.stringify(session).includes(secret),false);
 assert.equal((await fetch(base+'/api/media',{headers:{Cookie:cookie}})).status,200);assert.equal((await fetch(base+'/api/media/folder',{method:'POST',headers:{Cookie:cookie,'Content-Type':'application/json'},body:'{"path":"blocked"}'})).status,403);
 const headers={Cookie:cookie,'X-CSRF-Token':session.csrfToken,'Content-Type':'application/json'};assert.equal((await fetch(base+'/api/media/folder',{method:'POST',headers,body:'{"path":"authorized"}'})).status,201);
 assert.equal((await fetch(base+'/auth/logout',{method:'POST',headers})).status,204);assert.equal((await fetch(base+'/api/media',{headers:{Cookie:cookie}})).status,401);assert.equal((await fetch(base+'/existing.png')).status,200);
 }finally{await Promise.all([new Promise<void>(r=>imageServer.close(()=>r())),new Promise<void>(r=>staffServer.close(()=>r()))]);await rm(root,{recursive:true});}
});


test('Missing Image SSO configuration disables login while public files remain readable',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'dc-image-disabled-'));
 const {app,publicFiles}=await createImageApp({...config,production:false},media(root),undefined,undefined,null);app.use(publicFiles);app.use(mediaErrorHandler);const server=app.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${(server.address() as {port:number}).port}`;
 try{await writeFile(path.join(root,'existing.png'),Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/g0sAAAAASUVORK5CYII=','base64'));assert.equal((await fetch(base+'/existing.png')).status,200);assert.equal((await fetch(base+'/auth/sso/start')).status,503);assert.equal((await fetch(base+'/api/media')).status,401);assert.equal((await(await fetch(base+'/api/session')).json()).loginAvailable,false);}finally{await new Promise<void>(r=>server.close(()=>r()));await rm(root,{recursive:true});}
});
