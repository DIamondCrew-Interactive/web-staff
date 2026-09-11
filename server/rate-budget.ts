import type {Request} from 'express';
// Respect Express's configured trusted proxy boundary. Never read raw forwarding headers.
export const requestAddress = (req:Request) => req.ip || req.socket.remoteAddress || 'unknown';
export function createRateBudget(limit:number, now=Date.now, windowMs=60000, maxKeys=10000) {
  const counters=new Map<string,{count:number;expires:number}>();
  return (key:string):boolean => {
    const time=now();
    for(const [id,bucket] of counters) if(bucket.expires<=time) counters.delete(id);
    let bucket=counters.get(key);
    if(!bucket){if(counters.size>=maxKeys)return false;bucket={count:0,expires:time+windowMs};counters.set(key,bucket);}
    if(bucket.count>=limit)return false;
    bucket.count++;return true;
  };
}
