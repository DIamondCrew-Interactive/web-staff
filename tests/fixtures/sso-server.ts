// Local joint-repository contract fixture. Production entrypoints never import it.
import {generateKeyPairSync,randomBytes} from 'node:crypto';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createApp} from '../../server/app.js';
import {config} from '../../server/config.js';
import {readSsoClients} from '../../server/sso-config.js';
const directory=mkdtempSync(path.join(tmpdir(),'dci-staff-joint-')),keyfile=path.join(directory,'sign.pem');
const keys=generateKeyPairSync('ed25519'),kid='joint-fixture';
writeFileSync(keyfile,keys.privateKey.export({type:'pkcs8',format:'pem'}),{mode:0o600});
const c={...config,production:false,targets:[],token:'',pterodactylUrl:'',sessionSecret:randomBytes(32).toString('base64url'),discordClientId:'111111111111111111',discordClientSecret:'test-only',discordRedirectUri:'https://staff.diamondcrew.net/auth/discord/callback',ssoEnabled:true,ssoIssuer:'https://staff.diamondcrew.net',ssoPrivateKeyFile:keyfile,ssoKeyId:kid,ssoClients:readSsoClients(JSON.stringify([{id:'servercontroller',callbackUrl:'https://admin.example/auth/sso/callback',startUrl:'https://admin.example/auth/sso/start',clientSecret:'s'.repeat(43),allowedDiscordIds:['584274123622973440']}]),false)};
const app=createApp('staff',c,async input=>new Response(JSON.stringify(String(input).endsWith('/token')?{token_type:'Bearer',access_token:'test-only'}:{id:'584274123622973440',username:'fixture'}),{headers:{'Content-Type':'application/json'}}));
const server=app.listen(0,'127.0.0.1',()=>console.log(JSON.stringify({origin:`http://127.0.0.1:${(server.address() as {port:number}).port}`,issuer:c.ssoIssuer,verification_keys:{[kid]:keys.publicKey.export({type:'spki',format:'pem'})}})));
const cleanup=()=>rmSync(directory,{recursive:true,force:true});
process.on('exit',cleanup);
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>server.close(()=>{cleanup();process.exit(0);}));
