import express from 'express';
import type {Express,Request,Response,NextFunction} from 'express';
import {AccessError,type AccessStore} from './access-store.js';
import {accessServices} from '../src/shared/access.js';
import type {createAuth} from './auth.js';
import {createRateBudget,requestAddress} from './rate-budget.js';
export function mountAccessAdmin(app:Express,auth:ReturnType<typeof createAuth>,store:AccessStore|undefined,now=Date.now){
 if(!store)return;
 const readBudget=createRateBudget(120,now),writeBudget=createRateBudget(30,now);
 const requireAdmin=(req:Request,res:Response,next:NextFunction)=>{res.set('Cache-Control','private, no-store');const session=auth.session(req);if(!session){res.status(401).json({error:'Sign in first'});return;}const actor=store.user(session.user.id);if(!actor?.active||!actor.admin){res.status(403).json({error:'Administrator access required'});return;}if(!readBudget(requestAddress(req))){res.status(429).json({error:'Try again later'});return;}res.locals.accessActor=actor.id;next();};
 app.use('/api/admin/access',requireAdmin);
 app.get('/api/admin/access',(_req,res)=>{const snapshot=store.read();res.json({revision:snapshot.revision,users:Object.values(snapshot.users),audit:snapshot.audit.slice(-100).reverse(),actorId:res.locals.accessActor,services:accessServices});});
 app.get('/api/admin/access/audit',(req,res)=>{if(Object.keys(req.query).some(k=>k!=='before')||(req.query.before!==undefined&&(typeof req.query.before!=='string'||!/^\d{1,10}$/.test(req.query.before)))){res.status(400).json({error:'Invalid audit cursor'});return;}const snapshot=store.read(),before=req.query.before===undefined?snapshot.revision+1:Number(req.query.before);const entries=snapshot.audit.filter(a=>a.revision<before).slice(-100).reverse();res.json({entries,nextBefore:entries.at(-1)?.revision??null});});
 app.put('/api/admin/access/users/:id',auth.requireWrite,express.json({limit:'8kb',strict:true}),(req,res)=>{
  if(!writeBudget(res.locals.accessActor)){res.status(429).json({error:'Try again later'});return;}
  try{const snapshot=store.update(res.locals.accessActor,req.params.id as string,req.body);res.json({revision:snapshot.revision,user:snapshot.users[req.params.id as string]});}
  catch(error){if(error instanceof AccessError){res.status(error.status).json({error:error.message});return;}throw error;}
 });
 app.use('/api/admin/access',(_req,res)=>res.status(404).json({error:'Not found'}));
 app.use('/api/admin/access',(error:unknown,_req:Request,res:Response,_next:NextFunction)=>{const status=error instanceof AccessError?error.status:(error as {type?:string})?.type==='entity.too.large'?413:(error as {type?:string})?.type==='entity.parse.failed'?400:503;res.status(status).json({error:status===400?'Invalid request':status===413?'Request too large':'Access management unavailable'});});
 return requireAdmin;
}
