import type {Express} from 'express';
import {services, infrastructureServices} from '../src/config/services.js';
export function launcherConfig(proxyEnabled = process.env.LAUNCHER_PROXY_ENABLED === 'true', imageEnabled = process.env.LAUNCHER_IMAGE_ENABLED === 'true') {
 return {services:services.map(service=>service.id==='proxy' && proxyEnabled?{...service,enabled:true,status:'OPERATIONAL' as const}:service),infrastructureServices:infrastructureServices.map(service=>service.id==='images' && imageEnabled?{...service,enabled:true,status:'OPERATIONAL' as const}:service)};
}
export function mountLauncher(app:Express) {
 app.get('/api/launcher',(_req,res)=>{res.set('Cache-Control','no-store');res.json(launcherConfig());});
}
