import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { once } from 'node:events';
import { request as httpRequest } from 'node:http';
import sharp from 'sharp';
import { config } from '../server/config.js';
import { createImageApp, mediaErrorHandler, type ImageConfig } from '../server/media/app.js';
import { LocalStorageAdapter, mediaPath } from '../server/media/storage.js';
import { mockImageBroker, testNonce } from './fixtures/image-broker.js';

const png = await sharp({ create: { width: 12, height: 12, channels: 4, background: '#2ec7ff' } }).png().toBuffer();
async function fixture(limits: Partial<ImageConfig> = {}) {
  const root = await fs.mkdtemp(path.join(tmpdir(), 'dc-media-test-'));
  const media = { root, publicOrigin: 'https://img.dcrp.cz', maxUploadBytes: 1024 * 1024, maxBatchBytes: 2 * 1024 * 1024, maxFiles: 3, cacheSeconds: 300, ...limits };
  const c = { ...config, production: false };
  const broker = mockImageBroker();
  const { app, publicFiles } = await createImageApp(c, media, broker.transport, undefined, broker.config);
  app.use(publicFiles); app.use(mediaErrorHandler);
  const server = app.listen(0, '127.0.0.1'); await once(server, 'listening');
  const base = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  const start = await fetch(base + '/auth/sso/start', { redirect: 'manual' });
  const state = new URL(start.headers.get('location')!).searchParams.get('state');
  const logged = await fetch(`${base}/auth/sso/callback?ticket=${testNonce()}&state=${state}`, { redirect: 'manual', headers: { Cookie: start.headers.getSetCookie()[0].split(';')[0] } });
  const cookie = logged.headers.getSetCookie().find(s => s.startsWith('dci_image_session='))!.split(';')[0];
  const session = await (await fetch(base + '/api/session', { headers: { Cookie: cookie } })).json();
  const headers = { Cookie: cookie, 'X-CSRF-Token': session.csrfToken };
  const call = (endpoint: string, method = 'GET', body?: unknown, custom = headers) => fetch(base + endpoint, { method, headers: { ...custom, ...(body ? { 'Content-Type': 'application/json' } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  const upload = (names: string[], folder = '', options: { data?: Buffer; mime?: string; overwrite?: boolean } = {}) => {
    const data = new FormData(); for (const name of names) data.append('files', new Blob([new Uint8Array(options.data || png)], { type: options.mime || 'image/png' }), encodeURIComponent(name));
    return fetch(`${base}/api/media/upload?${new URLSearchParams({ path: folder, overwrite: String(options.overwrite || false) })}`, { method: 'POST', headers, body: data });
  };
  return { root, base, headers, call, upload, close: async () => { await new Promise<void>(r => server.close(() => r())); assert.ok(path.resolve(root).startsWith(path.resolve(tmpdir()) + path.sep + 'dc-media-test-')); await fs.rm(root, { recursive: true }); } };
}
test('Image Service health, private inventory, auth and CSRF boundaries', async () => {
  const f = await fixture();
  try {
    assert.deepEqual(await (await fetch(f.base + '/healthz')).json(), { status: 'ok' });
    assert.equal((await fetch(f.base + '/api/media')).status, 401);
    for (const [route, method] of [['folder', 'POST'], ['upload','POST'], ['move','PATCH'], ['rename','PATCH'], ['file','DELETE'], ['folder','DELETE']]) assert.equal((await fetch(`${f.base}/api/media/${route}`, { method })).status, 401);
    assert.equal((await f.call('/api/media/folder', 'POST', { path: 'missing-csrf' }, { Cookie: f.headers.Cookie } as any)).status, 403);
    const listing = await f.call('/api/media'); assert.equal(listing.status,200); assert.equal(listing.headers.get('access-control-allow-origin'), null);
    const text = await listing.text(); assert.ok(!text.includes(f.root));
    assert.equal((await fetch(f.base + '/')).status, 400); // no anonymous directory listing
  } finally { await f.close(); }
});
test('nested folders, batch upload, public URL, image headers and revalidation', async () => {
  const f = await fixture();
  try {
    assert.equal((await f.call('/api/media/folder','POST',{path:'inventory/food'})).status,201);
    const uploaded = await f.upload(['burger.png','pizza.png'],'inventory/food'); assert.equal(uploaded.status,201);
    const body = await uploaded.json(); assert.equal(body.entries[0].publicUrl,'https://img.dcrp.cz/inventory/food/burger.png');
    const image = await fetch(f.base + '/inventory/food/burger.png'); assert.equal(image.status,200); assert.equal(image.headers.get('content-type'),'image/png'); assert.equal(image.headers.get('access-control-allow-origin'),'*'); assert.match(image.headers.get('cache-control')!,/max-age=300/); assert.equal(image.headers.get('x-content-type-options'),'nosniff');
    assert.equal((await fetch(f.base + '/inventory/food/burger.png',{headers:{'If-None-Match':image.headers.get('etag')!}})).status,304);
    assert.equal((await fetch(f.base + '/inventory/food/burger.png',{method:'POST'})).status,405);
    const search = await (await f.call('/api/media?q=burger')).json(); assert.equal(search.entries.length,1);
    assert.equal((await f.call('/api/media/info?path=inventory/food/burger.png')).status,200);
    assert.equal((await fetch(f.base + '/inventory/food')).status,404);
  } finally { await f.close(); }
});
test('rename, move, copy, folder move and explicit non-empty folder deletion', async () => {
  const f = await fixture();
  try {
    await f.call('/api/media/folder','POST',{path:'kostka'}); await f.upload(['1.png'],'kostka');
    assert.equal((await f.call('/api/media/rename','PATCH',{source:'kostka/1.png',target:'kostka/2.png'})).status,200);
    await f.call('/api/media/folder','POST',{path:'inventory'});
    assert.equal((await f.call('/api/media/move','PATCH',{source:'kostka/2.png',target:'inventory/2.png'})).status,200);
    assert.equal((await f.call('/api/media/copy','PATCH',{source:'inventory/2.png',target:'inventory/3.png'})).status,200);
    assert.equal((await f.call('/api/media/rename','PATCH',{source:'inventory',target:'food'})).status,200);
    assert.equal((await f.call('/api/media/move','PATCH',{source:'food',target:'food/nested'})).status,400);
    assert.equal((await f.call('/api/media/folder','DELETE',{path:'food'})).status,409);
    assert.equal((await f.call('/api/media/folder','DELETE',{path:'food',confirmation:'wrong'})).status,409);
    assert.equal((await f.call('/api/media/file','DELETE',{path:'food/3.png'})).status,204);
    assert.equal((await f.call('/api/media/folder','DELETE',{path:'food',confirmation:'food'})).status,204);
    assert.equal((await f.call('/api/media/folder','DELETE',{path:'kostka'})).status,204);
  } finally { await f.close(); }
});
test('file collisions never overwrite silently and invalid batches write nothing', async () => {
  const f = await fixture();
  try {
    await f.upload(['burger.png']);
    assert.equal((await f.upload(['new.png','burger.png'])).status,409);
    assert.equal((await fetch(f.base + '/new.png')).status,404);
    assert.equal((await f.upload(['burger.png'], '', { overwrite:true })).status,201);
    assert.equal((await f.upload(['duplicate.png','duplicate.png'])).status,409);
    assert.equal((await f.call('/api/media/copy','PATCH',{source:'burger.png',target:'burger.png'})).status,400);
  } finally { await f.close(); }
});
test('signature, MIME, SVG, corrupt input, file and batch limits', async () => {
  const f = await fixture({ maxUploadBytes: 1000, maxBatchBytes: 1500, maxFiles: 2 });
  try {
    assert.equal((await f.upload(['fake.png'],'',{data:Buffer.from('<script>alert(1)</script>')})).status,415);
    assert.equal((await f.upload(['valid.png'],'',{mime:'text/plain'})).status,415);
    assert.equal((await f.upload(['wrong.jpg'])).status,415);
    assert.equal((await f.upload(['unsafe.svg'],'',{mime:'image/svg+xml'})).status,415);
    assert.equal((await f.upload(['large.png'],'',{data:Buffer.alloc(1100)})).status,413);
    assert.equal((await f.upload(['a.png','b.png','c.png'])).status,413);
    assert.equal((await f.upload(['a.png','b.png'],'',{data:Buffer.alloc(800)})).status,413);
    assert.equal((await f.upload(['okay.png'])).status,201); // rejected upload releases writer
  } finally { await f.close(); }
});
test('traversal, encoded/absolute paths and symlink escapes are rejected', async () => {
  const f = await fixture();
  const outside = await fs.mkdtemp(path.join(tmpdir(),'dc-media-outside-'));
  try {
    for (const attack of ['../secret','../../etc/passwd','%2e%2e/','%252e%252e/','C:\\Windows','/etc/passwd','a\\b','a/../b','a\0b','con.png','api/folder']) {
      assert.throws(() => mediaPath(attack));
      const res = await f.call('/api/media/folder','POST',{path:attack}); assert.equal(res.status,400,attack);
      assert.ok(!(await res.text()).includes(f.root));
      assert.equal((await f.call('/api/media?path='+encodeURIComponent(attack))).status,400);
    }
    await fs.writeFile(path.join(outside,'secret.png'),png);
    const link = path.join(f.root,'escape'); await fs.symlink(outside,link,process.platform==='win32'?'junction':'dir');
    try {
      assert.equal((await f.call('/api/media?path=escape')).status,400);
      assert.equal((await fetch(f.base + '/escape/secret.png')).status,400);
      assert.equal((await f.call('/api/media/folder','DELETE',{path:'escape',confirmation:'escape'})).status,400);
      await assert.rejects(new LocalStorageAdapter(link,'https://img.dcrp.cz').initialize());
    } finally { await fs.unlink(link); }
    for (const target of ['%2e%2e/secret.png','%252e%252e%252fsecret.png','%2fetc%2fpasswd']) {
      const status = await new Promise<number>((resolve,reject) => { const req=httpRequest(f.base,{path:'/'+target},res=>{res.resume();resolve(res.statusCode!);});req.on('error',reject);req.end(); }); assert.equal(status,400);
    }
  } finally { await fs.unlink(path.join(outside,'secret.png')); await fs.rmdir(outside); await f.close(); }
});

test('legacy Unicode and apostrophe paths preserve bytes through public URLs, management and audit', async () => {
 const f=await fixture(), names=["at_muzzle_precision'.png",'obrázek_2026-05-18_222909787.png','obra\u0301zek.png'];
 try {
  await fs.mkdir(path.join(f.root,'uploads'));for(const name of names)await fs.writeFile(path.join(f.root,'uploads',name),png);
  const listing=await(await f.call('/api/media?path=uploads')).json();assert.deepEqual(listing.entries.map((e:any)=>e.name).sort(),[...names].sort());
  for(const e of listing.entries){assert.equal(mediaPath(e.path),e.path);assert.equal(decodeURIComponent(new URL(e.publicUrl).pathname.slice(1)),e.path);if(e.name.includes("'"))assert.ok(e.publicUrl.includes('%27'));const response=await fetch(f.base+new URL(e.publicUrl).pathname);assert.equal(response.status,200);assert.deepEqual(Buffer.from(await response.arrayBuffer()),png);assert.equal((await f.call('/api/media/info?'+new URLSearchParams({path:e.path}))).status,200);}
  const source='uploads/'+names[1],target="uploads/kopie_obrázku'.png";assert.equal((await f.call('/api/media/copy','PATCH',{source,target})).status,200);assert.equal((await f.call('/api/media/rename','PATCH',{source:target,target:"uploads/přejmenovaný'.png"})).status,200);
  const {execFile}=await import('node:child_process');const {promisify}=await import('node:util');const audit=await promisify(execFile)(process.execPath,['--import','tsx','scripts/audit-media.ts',f.root]);assert.equal(JSON.parse(audit.stderr.trim()).files,4);for(const name of names){assert.ok(audit.stdout.includes('uploads/'+name));assert.deepEqual(await fs.readFile(path.join(f.root,'uploads',name)),png);}
 }finally{await f.close();}
});
test('Unicode path support keeps traversal, controls, invisible characters and metacharacters rejected',()=>{
 for(const name of ['../x.png','uploads/../x.png','uploads/a..png','uploads/a\\b.png','uploads/a%2fb.png','uploads/a;b.png','uploads/a$b.png','uploads/a`b.png','uploads/a"b.png','uploads/<a>.png','uploads/a\u0000.png','uploads/a\n.png','uploads/a\u202e.png','uploads/a\u200d.png','uploads/a\u034f.png','uploads/\u0301a.png','uploads/a.png.','uploads/CON.png','uploads/'+'界'.repeat(86)+'.png'])assert.throws(()=>mediaPath(name),name);
 for(const value of ['uploads/obrázek.png','uploads/obra\u0301zek.png'])assert.equal(mediaPath(value),value);
});

test('multipart uploads preserve Unicode and apostrophe filenames',async()=>{
 const f=await fixture();try{const names=["at_muzzle_precision'.png",'obrázek_2026-05-18_222909787.png'];const response=await f.upload(names);assert.equal(response.status,201);assert.deepEqual((await response.json()).entries.map((e:any)=>e.name),names);}finally{await f.close();}
});

test('multipart filename decoding rejects malformed, nested encoding and encoded traversal',async()=>{
 const f=await fixture();try{for(const name of ['%','%2E%2E%2Fescape.png','a%252fb.png','a%00.png']){const form=new FormData();form.append('files',new Blob([new Uint8Array(png)],{type:'image/png'}),name);assert.equal((await fetch(f.base+'/api/media/upload',{method:'POST',headers:f.headers,body:form})).status,400);}assert.deepEqual((await(await f.call('/api/media')).json()).entries,[]);}finally{await f.close();}
});
