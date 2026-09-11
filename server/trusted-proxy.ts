import {isIP} from 'node:net';
import type {Express} from 'express';
export function readTrustedProxyCidrs(raw=''):string[] {
 if(!raw.trim())return [];
 const entries=raw.split(',').map(s=>s.trim());
 if(entries.length>32)throw Error('Too many trusted proxy CIDRs');
 for(const entry of entries){
  const parts=entry.split('/'),family=isIP(parts[0]);
  if(!family || parts.length>2 || (parts.length===2 && (!/^\d{1,3}$/.test(parts[1]) || Number(parts[1])<1 || Number(parts[1])>(family===4?32:128))))throw Error('Trusted proxies must be explicit IP addresses or nonzero CIDRs');
 }
 return [...new Set(entries)];
}
export function configureTrustedProxy(app:Express,raw=process.env.TRUST_PROXY_CIDRS||'') {
 const cidrs=readTrustedProxyCidrs(raw);app.set('trust proxy',cidrs.length?cidrs:false);
}
