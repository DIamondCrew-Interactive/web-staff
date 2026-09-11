// Test-only signing material; never imported by server or browser bundles.
import {generateKeyPairSync, randomBytes, randomUUID, sign} from 'node:crypto';
import {parseImageSsoConfig} from '../../server/media/sso-auth.js';
import type {Fetcher} from '../../server/adapters.js';
export const testNonce=()=>randomBytes(32).toString('base64url');
export function mockImageBroker(now=Date.now) {
 const keys=generateKeyPairSync('ed25519'); const redeemSecret=testNonce();
 const config=parseImageSsoConfig({redeem_secret:redeemSecret,verification_keys:{fixture:keys.publicKey.export({type:'spki',format:'pem'})},allowed_ids:['111111111111111111']});
 const assertion=(state:string,overrides:object={},header:object={})=>{const h=Buffer.from(JSON.stringify({alg:'EdDSA',typ:'JWT',kid:'fixture',...header})).toString('base64url');const p=Buffer.from(JSON.stringify({iss:'https://staff.diamondcrew.net',aud:'image-service',sub:'111111111111111111',iat:Math.floor(now()/1000),exp:Math.floor(now()/1000)+45,jti:randomUUID(),state,...overrides})).toString('base64url');return h+'.'+p+'.'+sign(null,Buffer.from(h+'.'+p),keys.privateKey).toString('base64url');};
 const transport:Fetcher=async(input,init)=>{
  if(String(input)!=='https://staff.diamondcrew.net/sso/api/redeem' || init?.method!=='POST' || new Headers(init.headers).get('Authorization')!=='Bearer '+redeemSecret) throw Error('Unexpected fixture request');
  const body=JSON.parse(String(init.body));if(body.audience!=='image-service')throw Error('Wrong fixture audience');
  return new Response(JSON.stringify({assertion:assertion(body.state),token_type:'DCI-SSO',expires_in:45}),{headers:{'Content-Type':'application/json'}});
 };
 return {config,transport,assertion};
}
