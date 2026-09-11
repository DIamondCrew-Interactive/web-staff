import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync, randomBytes, createHash, verify} from 'node:crypto';
import {mkdtempSync, writeFileSync, rmSync, chmodSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {once} from 'node:events';
import {createApp} from '../server/app.js';
import {config} from '../server/config.js';
import {readSsoClients, readSigningKey, readPrivateFile} from '../server/sso-config.js';
const nonce=()=>randomBytes(32).toString('base64url');
const id='111111111111111111';
const client=(id='servercontroller', clientSecret=nonce())=>({id,clientSecret,callbackUrl:`https://${id==='servercontroller'?'admin':'proxy'}.diamondcrew.net/auth/sso/callback`,startUrl:`https://${id==='servercontroller'?'admin':'proxy'}.diamondcrew.net/auth/sso/start`,allowedDiscordIds:['111111111111111111']});
test('SSO configuration rejects duplicate credentials, audience URL substitution and unsafe key files',()=>{
 const a=client(); assert.throws(()=>readSsoClients(JSON.stringify([a,client('proxymanager',a.clientSecret)])));
 assert.throws(()=>readSsoClients(JSON.stringify([{...a,callbackUrl:'https://evil.test/auth/sso/callback'}])));
 assert.throws(()=>readPrivateFile('relative.pem'));
 const dir=mkdtempSync(path.join(tmpdir(),'sso-config-')); try {
 const file=path.join(dir,'key.pem'); writeFileSync(file,'bad key',{mode:0o600}); assert.throws(()=>readSigningKey(file));
 const rsa=generateKeyPairSync('rsa',{modulusLength:2048}); writeFileSync(file,rsa.privateKey.export({type:'pkcs8',format:'pem'})); assert.throws(()=>readSigningKey(file));
 if(process.platform!=='win32'){chmodSync(file,0o644);assert.throws(()=>readPrivateFile(file));}
 }finally{rmSync(dir,{recursive:true,force:true});}
});
test('real Staff session flow binds tickets to state, PKCE, audience and session; signs one-use assertions',async()=>{
 const dir=mkdtempSync(path.join(tmpdir(),'sso-test-')), file=path.join(dir,'key.pem');
 const keys=generateKeyPairSync('ed25519'); writeFileSync(file,keys.privateKey.export({type:'pkcs8',format:'pem'}),{mode:0o600});
 let time=Date.now(); const a=client(), b=client('proxymanager');
 const c={...config,production:false,ssoEnabled:true,ssoPrivateKeyFile:file,ssoKeyId:'test-key',sessionSecret:nonce(),ssoClients:readSsoClients(JSON.stringify([a,b])),discordClientId:id,discordClientSecret:'test',discordRedirectUri:'http://localhost/auth/discord/callback',targets:[]};
 const app=createApp('staff',c,async input=>new Response(JSON.stringify(String(input).includes('/token')?{token_type:'Bearer',access_token:'fixture'}:{id,username:'test'}),{headers:{'Content-Type':'application/json'}}),()=>time);
 const server=app.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${(server.address() as {port:number}).port}`;
 try {
 const state=nonce(), verifier=nonce(), challenge=createHash('sha256').update(verifier).digest('base64url');
 const get=(route:string,cookie='')=>fetch(base+route,{redirect:'manual',headers:{Cookie:cookie}});
 const start=await get(`/sso/servercontroller?state=${state}&code_challenge=${challenge}`); assert.equal(start.status,302);
 const oauth=new URL(start.headers.get('location')!); const login=await get(`/auth/discord/callback?code=fixture&state=${oauth.searchParams.get('state')}`,start.headers.getSetCookie()[0].split(';')[0]);
 assert.equal(login.headers.get('location'),`/sso/servercontroller?state=${state}&code_challenge=${challenge}`);
 const cookie=login.headers.getSetCookie().find(v=>v.startsWith('dc_session='))!.split(';')[0];
 const issue=async()=>{const r=await get(`/sso/servercontroller?state=${state}&code_challenge=${challenge}`,cookie);assert.equal(r.status,303);const u=new URL(r.headers.get('location')!);assert.equal(u.origin,'https://admin.diamondcrew.net');assert.equal(u.searchParams.get('state'),state);assert.equal(u.searchParams.has('assertion'),false);return u.searchParams.get('ticket')!;};
 const redeem=(ticket:string,overrides:object={},secret=a.clientSecret)=>fetch(base+'/sso/api/redeem',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+secret},body:JSON.stringify({ticket,state,audience:a.id,code_verifier:verifier,...overrides})});
 const ticket=await issue();assert.match(ticket,/^[A-Za-z0-9_-]{43}$/);
 assert.equal((await redeem(nonce())).status,400);
 assert.equal((await redeem(ticket,{},nonce())).status,401);
 assert.equal((await redeem(ticket,{audience:b.id},b.clientSecret)).status,400);
 assert.equal((await redeem(ticket,{state:nonce()})).status,400);
 assert.equal((await redeem(ticket,{code_verifier:nonce()})).status,400);
 const concurrent=await Promise.all([redeem(ticket),redeem(ticket)]);assert.deepEqual(concurrent.map(r=>r.status).sort(),[200,400]);
 const body=await concurrent.find(r=>r.status===200)!.json();assert.equal(body.token_type,'DCI-SSO');assert.equal(body.expires_in,45);
 const [h,p,s]=body.assertion.split('.');assert.deepEqual(JSON.parse(Buffer.from(h,'base64url').toString()),{alg:'EdDSA',typ:'JWT',kid:'test-key'});
 assert.ok(verify(null,Buffer.from(h+'.'+p),keys.publicKey,Buffer.from(s,'base64url')));assert.equal(verify(null,Buffer.from(h+'.'+p+'x'),keys.publicKey,Buffer.from(s,'base64url')),false);
 const claims=JSON.parse(Buffer.from(p,'base64url').toString());assert.equal(claims.sub,id);assert.equal(claims.iss,'https://staff.diamondcrew.net');assert.equal(claims.aud,a.id);assert.equal(claims.state,state);assert.equal(claims.exp-claims.iat,45);assert.ok(claims.jti);
 const expired=await issue();time+=45000;assert.equal((await redeem(expired)).status,400);
 const revoked=await issue(); c.ssoClients[0].allowedDiscordIds.clear();assert.equal((await redeem(revoked)).status,400);assert.equal((await get(`/sso/servercontroller?state=${state}&code_challenge=${challenge}`,cookie)).status,403);c.ssoClients[0].allowedDiscordIds.add(id);
 const logoutTicket=await issue();const session=await (await get('/api/session',cookie)).json();assert.equal((await fetch(base+'/auth/logout',{method:'POST',headers:{Cookie:cookie,'X-CSRF-Token':session.csrfToken}})).status,204);assert.equal((await redeem(logoutTicket)).status,400);
 assert.equal((await get('/sso/servercontroller?state=invalid&code_challenge=x',cookie)).status,400);
 }finally{await new Promise<void>(r=>server.close(()=>r()));rmSync(dir,{recursive:true,force:true});}
});
test('SSO disabled by default leaves broker endpoints unavailable',async()=>{
 const server=createApp('staff',{...config,ssoEnabled:false}).listen(0,'127.0.0.1');await once(server,'listening');try{assert.equal((await fetch(`http://127.0.0.1:${(server.address() as {port:number}).port}/sso/servercontroller`)).status,404);}finally{await new Promise<void>(r=>server.close(()=>r()));}
});
