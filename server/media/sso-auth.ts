import {imageAccessReader,type AccessReader} from '../access-store.js';
import {createRateBudget, requestAddress} from '../rate-budget.js';
import {createHash, createPublicKey, randomBytes, timingSafeEqual, verify, type KeyObject} from 'node:crypto';
import type {Express, Request, Response, NextFunction} from 'express';
import type {Fetcher} from '../adapters.js';
import {readPrivateFile} from '../sso-config.js';
const issuer = 'https://staff.diamondcrew.net', audience = 'image-service';
const opaque = /^[A-Za-z0-9_-]{43}$/;
const nonce = () => randomBytes(32).toString('base64url');
const hash = (s: string) => createHash('sha256').update(s).digest();
const equal = (a: string, b: string) => timingSafeEqual(hash(a), hash(b));
export interface ImageSsoConfig { redeemSecret: string; verificationKeys: Map<string, KeyObject>; allowedIds: Set<string> }
export function parseImageSsoConfig(value: unknown): ImageSsoConfig {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Invalid Image SSO configuration');
  const v = value as Record<string, unknown>;
  if (Object.keys(v).some(k => !['redeem_secret','verification_keys','allowed_ids'].includes(k)) || typeof v.redeem_secret !== 'string' || !/^[A-Za-z0-9_-]{43,128}$/.test(v.redeem_secret)) throw Error('Invalid Image SSO credential');
  if (!Array.isArray(v.allowed_ids) || v.allowed_ids.length > 1000 || !v.allowed_ids.every(id => typeof id === 'string' && /^\d{17,20}$/.test(id))) throw Error('Invalid Image SSO access list');
  if (!v.verification_keys || typeof v.verification_keys !== 'object' || Array.isArray(v.verification_keys)) throw Error('Missing Image SSO public keys');
  const entries = Object.entries(v.verification_keys);
  if (!entries.length || entries.length > 4) throw Error('Invalid Image SSO public key count');
  const verificationKeys = new Map<string, KeyObject>();
  for (const [kid, pem] of entries) {
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(kid) || typeof pem !== 'string' || pem.length > 2048 || !pem.startsWith('-----BEGIN PUBLIC KEY-----')) throw Error('Invalid Image SSO public key');
    const key = createPublicKey(pem);
    if (key.asymmetricKeyType !== 'ed25519') throw Error('Image SSO requires Ed25519 public keys');
    verificationKeys.set(kid, key);
  }
  return {redeemSecret: v.redeem_secret, verificationKeys, allowedIds: new Set(v.allowed_ids as string[])};
}
export function readImageSsoConfig(): ImageSsoConfig | null {
  return process.env.IMAGE_SSO_CONFIG_FILE ? parseImageSsoConfig(JSON.parse(readPrivateFile(process.env.IMAGE_SSO_CONFIG_FILE))) : null;
}
export function verifyImageAssertion(assertion: unknown, state: string, config: ImageSsoConfig, now = Date.now, access?:AccessReader) {
  if (typeof assertion !== 'string' || assertion.length > 8192) throw Error('Invalid assertion');
  const parts = assertion.split('.');
  if (parts.length !== 3 || !parts.every(s => /^[A-Za-z0-9_-]+$/.test(s)) || parts[0].length > 1024) throw Error('Invalid assertion');
  const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
  if (!header || typeof header !== 'object' || Array.isArray(header) || Object.keys(header).some(k => !['alg','typ','kid'].includes(k)) || header.alg !== 'EdDSA' || header.typ !== 'JWT' || typeof header.kid !== 'string') throw Error('Invalid assertion header');
  const key = config.verificationKeys.get(header.kid);
  const signature = Buffer.from(parts[2], 'base64url');
  if (!key || signature.length !== 64 || signature.toString('base64url') !== parts[2] || !verify(null, Buffer.from(parts[0]+'.'+parts[1]), key, signature)) throw Error('Invalid assertion signature');
  const claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString()), seconds = Math.floor(now()/1000);
  if (!claims || typeof claims !== 'object' || Array.isArray(claims) || claims.iss !== issuer || claims.aud !== audience || typeof claims.sub !== 'string' || !/^\d{17,20}$/.test(claims.sub) || !Number.isSafeInteger(claims.iat) || !Number.isSafeInteger(claims.exp) || claims.iat > seconds + 5 || claims.exp <= seconds || claims.exp <= claims.iat || claims.exp - claims.iat > 45 || typeof claims.state !== 'string' || !equal(claims.state, state) || typeof claims.jti !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(claims.jti)) throw Error('Invalid assertion claims');
  const profile=access?.user(claims.sub);
  if (access ? !profile?.active || !profile.grants.includes('image-service') || claims.access_epoch!==profile.epoch : !config.allowedIds.has(claims.sub)) throw Error('No Image Service access');
  return claims as {sub:string; jti:string; exp:number; access_epoch?:number};
}
export function createImageAuth(production: boolean, config: ImageSsoConfig | null, request: Fetcher = fetch, now = Date.now, access:AccessReader|undefined = imageAccessReader()) {
  type Session = {id:string; csrf:string; expires:number; accessEpoch?:number};
  const transactions = new Map<string,{state:string; verifier:string; expires:number}>(), sessions = new Map<string,Session>(), used = new Map<string,number>();
  const sessionName = production ? '__Host-dci_image_session' : 'dci_image_session', transactionName = production ? '__Host-dci_image_sso' : 'dci_image_sso';
  const options = {httpOnly:true, secure:production, sameSite:'lax' as const, path:'/'};
  const cookie = (req:Request,name:string) => (req.headers.cookie || '').split(';').map(s=>s.trim()).find(s=>s.startsWith(name+'='))?.slice(name.length+1) || '';
  const permitted=(s:Session)=>{if(!access)return !!config?.allowedIds.has(s.id);const profile=access.user(s.id);return !!profile?.active&&profile.grants.includes('image-service')&&profile.epoch===s.accessEpoch;};
  const prune = () => {const policy=access?.read();for(const [k,v] of transactions) if(v.expires<=now()) transactions.delete(k);for(const [k,v] of sessions){const profile=policy?.users[v.id];if(v.expires<=now() || (policy ? !profile?.active || !profile.grants.includes('image-service') || profile.epoch!==v.accessEpoch : !config?.allowedIds.has(v.id)))sessions.delete(k);}for(const [k,v] of used)if(v<=now())used.delete(k);};
  const session = (req:Request) => {const k=cookie(req,sessionName);if(!opaque.test(k))return;const s=sessions.get(k);if(s&&(s.expires<=now()||!permitted(s))){sessions.delete(k);return;}return s;};

  const requireDocs = (req:Request,res:Response,next:NextFunction) => {res.set('Cache-Control','private, no-store');if(!session(req)){res.status(401).json({error:'Sign in through Staff Center'});return;}next();};
  const requireWrite = (req:Request,res:Response,next:NextFunction) => {const s=session(req), csrf=req.get('X-CSRF-Token')||'';if(!s || !opaque.test(csrf) || !equal(s.csrf,csrf)){res.status(403).json({error:'Invalid session'});return;}next();};
  const startBudget=createRateBudget(120,now);
  function mount(app:Express) {
    app.use(['/auth','/api/session'],(_req,res,next)=>{res.set({'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'});next();});
    app.get('/api/session',(req,res)=>{const s=session(req);res.json({loginAvailable:!!config,authenticated:!!s,internalAccess:!!s,user:s?{username:'Image manager',displayName:'Image manager'}:null,...(s?{csrfToken:s.csrf}:{})});});
    app.get('/auth/sso/start',(req,res)=>{
      if(!config){res.status(503).send('Image Service sign-in unavailable');return;}
      prune();if(!startBudget(requestAddress(req)) || transactions.size>=10000){res.status(429).send('Try again later');return;}
      transactions.delete(cookie(req,transactionName)); const browser=nonce(), state=nonce(), verifier=nonce();
      transactions.set(browser,{state,verifier,expires:now()+300000}); res.cookie(transactionName,browser,{...options,maxAge:300000});
      res.redirect(303,issuer+'/sso/'+audience+'?'+new URLSearchParams({state,code_challenge:hash(verifier).toString('base64url')}));
    });
    app.get('/auth/sso/callback',async(req,res)=>{
      const browser=cookie(req,transactionName), pending=transactions.get(browser);transactions.delete(browser);res.clearCookie(transactionName,options);
      if(!config || !pending || pending.expires<=now() || typeof req.query.state!=='string' || !opaque.test(req.query.state) || !equal(pending.state,req.query.state) || typeof req.query.ticket!=='string' || !opaque.test(req.query.ticket) || Object.keys(req.query).some(k=>!['ticket','state'].includes(k))){res.status(400).send('Invalid or expired sign-in');return;}
      try {
        const response=await request(issuer+'/sso/api/redeem',{method:'POST',redirect:'error',signal:AbortSignal.timeout(8000),headers:{Authorization:'Bearer '+config.redeemSecret,'Content-Type':'application/json'},body:JSON.stringify({ticket:req.query.ticket,audience,state:pending.state,code_verifier:pending.verifier})});
        if(!response.ok) throw Error('Redemption rejected'); const raw=await response.text();if(raw.length>12000) throw Error('Invalid redemption response'); const result=JSON.parse(raw);
        if(pending.expires<=now() || result.token_type!=='DCI-SSO' || result.expires_in!==45) throw Error('Invalid redemption response');
        const claims=verifyImageAssertion(result.assertion,pending.state,config,now,access);prune();
        if(used.has(claims.jti) || sessions.size>=10000 || used.size>=10000) throw Error('Assertion already consumed or capacity reached');
        used.set(claims.jti,claims.exp*1000);sessions.delete(cookie(req,sessionName));const key=nonce();sessions.set(key,{id:claims.sub,...(access?{accessEpoch:claims.access_epoch}:{}),csrf:nonce(),expires:now()+3600000});
        res.cookie(sessionName,key,{...options,maxAge:3600000});res.redirect(303,'/manage');
      }catch{res.status(403).send('Image Service sign-in rejected. Start again from management.');}
    });
    app.post('/auth/logout',requireWrite,(req,res)=>{sessions.delete(cookie(req,sessionName));res.clearCookie(sessionName,options);res.status(204).end();});
    app.use('/auth',(_req,res)=>res.status(404).send('Not found'));
  }
  return {mount,requireDocs,requireWrite};
}
