import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { once } from 'node:events';
import { request as httpRequest } from 'node:http';
import { loadCookbook, searchCookbook } from '../server/cookbook.js';
import { createApp } from '../server/app.js';
import { config } from '../server/config.js';

const front = (title = 'Test guide', extra = '') => `---\ntitle: ${title}\ncategory: 01-test\ncategoryTitle: Test\norder: 1\naudience: [admin, ai]\ntags: [network, test]\n${extra}---\n`;
async function tempDocs() {
  const root = await fs.mkdtemp(path.join(tmpdir(), 'dc-cookbook-test-'));
  await fs.mkdir(path.join(root, '01-test'));
  const filename = path.join(root, '01-test/index.md');
  await fs.writeFile(filename, front() + '# Test guide\n\n## Network\nA specific pool overlap diagnosis.');
  return { root, filename, close: async () => { await fs.unlink(filename); await fs.rmdir(path.join(root, '01-test')); await fs.rmdir(root); } };
}
function rawRequest(base: string, pathname: string, method = 'GET') {
  return new Promise<{ status: number; body: string }>((resolve, reject) => {
    const req = httpRequest(base, { method, path: pathname }, res => {
      let body = ''; res.on('data', data => body += data); res.on('end', () => resolve({ status: res.statusCode!, body }));
    }); req.on('error', reject); req.end();
  });
}

test('Cookbook index includes every Markdown page, all 22 categories and validates links/fences', async () => {
  const pages = await loadCookbook();
  assert.equal(new Set(pages.map(p => p.category)).size, 22);
  async function count(root: string): Promise<number> {
    let n = 0;
    for (const entry of await fs.readdir(root, { withFileTypes: true })) n += entry.isDirectory() ? await count(path.join(root, entry.name)) : entry.name.endsWith('.md') ? 1 : 0;
    return n;
  }
  assert.equal(pages.length, await count('docs/internal'));
  assert.ok(pages.length > 100);
  for (const category of new Set(pages.map(p => p.category))) assert.ok(pages.some(p => p.slug === `${category}/index`));
  const user = searchCookbook(pages, 'Paper', 'user'); assert.ok(user.length > 0); assert.ok(user.every(p => p.slug.startsWith('18-')));
  assert.ok(searchCookbook(pages, 'Pool overlaps', 'troubleshooting').some(p => p.slug.endsWith('/pool-overlaps')));
  assert.ok(searchCookbook(pages, 'inspect', 'ai').every(p => p.slug.startsWith('19-')));
  assert.equal(pages.find(p => p.slug === '01-getting-started/index')?.categoryTitle, 'Začínáme');
  assert.ok(searchCookbook(pages, 'pripojeni SFTP', 'user').some(p => p.slug.endsWith('/servers/sftp')));
  const createServer = pages.find(p => p.slug.endsWith('/servers/create-server'))!;
  assert.ok(createServer.markdown.includes('Admin → Servers → Create New'));
  assert.ok(createServer.headings.some(h => h.text === 'CPU Limit'));
  assert.ok(createServer.headings.some(h => h.text === 'Ověření výsledku'));
});
test('malformed frontmatter, duplicate slugs, broken links and unclosed fences fail validation', async () => {
  const f = await tempDocs();
  try {
    for (const invalid of ['# No frontmatter', '---\ntitle: [broken\n---\n# Broken', front() + '# Test\n~~~bash\necho hello', front() + '# Test\n[Missing](missing.md)', front() + '# Test\n[Missing heading](index.md#absent)', front() + '# Test\n[Reference][missing]\n\n[missing]: missing.md']) {
      await fs.writeFile(f.filename, invalid);
      await assert.rejects(loadCookbook(f.root));
    }
    await fs.writeFile(f.filename, front('First', 'slug: duplicate\n') + '# First');
    const second = path.join(f.root, '01-test/second.md');
    await fs.writeFile(second, front('Second', 'slug: duplicate\n') + '# Second');
    try { await assert.rejects(loadCookbook(f.root), /duplicate slug/); } finally { await fs.unlink(second); }
  } finally { await f.close(); }
});
test('symlink/junction escapes and symlink roots are rejected', async () => {
  const f = await tempDocs(), outside = await fs.mkdtemp(path.join(tmpdir(), 'dc-cookbook-outside-'));
  const link = path.join(f.root, 'escape');
  await fs.writeFile(path.join(outside, 'secret.md'), 'DO-NOT-READ-SENTINEL');
  try {
    await fs.symlink(outside, link, process.platform === 'win32' ? 'junction' : 'dir');
    await assert.rejects(loadCookbook(f.root), /symlink/);
    await assert.rejects(loadCookbook(link), /symlink/);
  } finally { await fs.unlink(link); await fs.unlink(path.join(outside, 'secret.md')); await fs.rmdir(outside); await f.close(); }
});
test('AI endpoints work anonymously, are read-only and never resolve arbitrary paths', async () => {
  const app = createApp('staff', { ...config, targets: [], discordClientId: '', discordClientSecret: '' });
  const server = app.listen(0, '127.0.0.1'); await once(server, 'listening');
  const base = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  try {
    for (const route of ['/ai/cookbook.md', '/api/cookbook/index', '/api/cookbook/page/01-getting-started/index', '/api/cookbook/raw/01-getting-started/index.md', '/api/cookbook/search?q=Paper&filter=user', '/api/cookbook/bundle']) {
      const res = await fetch(base + route); assert.equal(res.status, 200, route);
      assert.equal(res.headers.get('x-robots-tag'), 'noindex, nofollow');
      const content = await res.text(); assert.ok(content.length > 10);
      for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) assert.equal((await rawRequest(base, route, method)).status, 405);
    }
    const entry = await (await fetch(base + '/ai/cookbook.md')).text();
    assert.ok(entry.includes('/api/cookbook/raw/01-getting-started/architecture'));
    assert.ok(!entry.includes('](architecture.md)'));
    assert.equal((await fetch(base + '/api/internal/docs/index')).status, 401);
    for (const attack of ['../.env', '%2e%2e/.env', '%252e%252e%252f.env', '%2fetc%2fpasswd', 'C:%5cWindows%5cwin.ini', '%00', '..%5c.env', '%25252e%25252e%25252f.env']) {
      for (const route of ['raw', 'page']) {
        const res = await rawRequest(base, `/api/cookbook/${route}/${attack}`);
        assert.ok([400, 404].includes(res.status), `${route}/${attack}: ${res.status}`);
        assert.ok(!res.body.includes('DISCORD_CLIENT_SECRET='));
      }
    }
    assert.equal((await fetch(base + '/api/cookbook/search?q=a&filter=invalid')).status, 400);
  } finally { await new Promise<void>(resolve => server.close(() => resolve())); }
});
