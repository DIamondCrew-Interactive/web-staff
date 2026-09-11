import { test, expect } from '@playwright/test';
import { mkdir, readdir, readFile } from 'node:fs/promises';

test('staff is public, simple, responsive and disabled tiles cannot launch', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 1536, height: 1100 });
  const response = await page.goto('http://127.0.0.1:4310');
  expect(response?.status()).toBe(200);
  await expect(page.locator('.launch-card')).toHaveCount(8);
  await expect(page.locator('.launch-card.disabled')).toHaveCount(6);
  await expect(page.locator('.launch-card.disabled a, .launch-card.disabled button, .launch-card.disabled .launch-arrow')).toHaveCount(0);
  await expect(page.locator('a.card-manager')).toHaveAttribute('href', 'https://panel.diamondcrew.net');
  await expect(page.locator('a.card-status')).toHaveAttribute('href', 'https://status.diamondcrew.net');
  await expect(page.locator('a.card-images')).toHaveAttribute('href', 'https://img.dcrp.cz');
  await expect(page.locator('.card-prismatic-prod img')).toHaveAttribute('src', '/branding/prismatic.png');
  await expect(page.locator('.card-diamond-prod img')).toHaveAttribute('src', '/branding/dcrp.svg');
  await expect(page.locator('.dev-ribbon')).toHaveCount(2);
  await expect(page.locator('.status-row')).toHaveCount(6);
  await expect(page.locator('.dot-unknown')).toHaveCount(6);
  await expect(page.getByRole('link', { name: 'Documentation' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Login with Discord' })).toBeDisabled();
  await expect(page.getByRole('heading', { name: 'Infrastructure Cookbook' })).toHaveCount(0);
  await mkdir('.artifacts', { recursive: true });
  await page.screenshot({ path: '.artifacts/staff-launcher-desktop.png', fullPage: true });
  for (const [width, columns] of [[1536,4],[820,2],[390,1],[320,1]]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator('.launcher-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length)).toBe(columns);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: '.artifacts/staff-launcher-mobile.png', fullPage: true });
  expect(errors).toEqual([]);
});

test('pure status is public and has no tool grid or docs', async ({ page, request }) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  expect((await page.goto('http://127.0.0.1:4311'))?.status()).toBe(200);
  await expect(page.locator('.status-card')).toHaveCount(4);
  await expect(page.locator('.tile')).toHaveCount(0);
  expect((await request.get('http://127.0.0.1:4311/api/internal/docs')).status()).toBe(404);
  await expect(page.locator('.summary-unknown strong')).toHaveText('4');
  await expect(page.locator('.summary-online strong')).toHaveText('0');
  await page.setViewportSize({ width: 1320, height: 1100 });
  await page.screenshot({ path: '.artifacts/status-redesign-desktop.png', fullPage: true });
  await page.getByRole('button', { name: 'Detail: Prismatic Roleplay' }).click();
  await expect(page.locator('#detail-prismatic-prod')).toContainText('zatím není připojen zdroj');
  await page.getByRole('button', { name: 'Detail: Prismatic Roleplay' }).click();
  for (const width of [820, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: '.artifacts/status-redesign-mobile.png', fullPage: true });
  const snapshot = await (await request.get('http://127.0.0.1:4311/api/public/status')).json();
  snapshot.servers.forEach((s: any, i: number) => { s.state = ['ONLINE', 'OFFLINE', 'DEGRADED', 'MAINTENANCE'][i]; s.responseMs = i === 0 ? 24 : null; s.response = 'OK'; });
  snapshot.incident = { title: 'Test incident', message: 'Fixture only' };
  await page.route('**/api/public/status', route => route.fulfill({ json: snapshot }));
  await page.getByRole('button', { name: 'Aktualizovat stav' }).click();
  for (const state of ['online','offline','degraded','maintenance']) await expect(page.locator(`.summary-${state} strong`)).toHaveText('1');
  await expect(page.locator('.summary-unknown strong')).toHaveText('0');
  await expect(page.getByRole('heading', { name: 'Probíhá údržba' })).toBeVisible();
  await expect(page.getByRole('alert')).toContainText('Test incident');
  await page.route('**/api/public/status', route => route.fulfill({ status: 503, body: '{}' }));
  await page.getByRole('button', { name: 'Aktualizovat stav' }).click();
  await expect(page.getByText('Aktualizace stavu není dostupná.', { exact: false })).toBeVisible();
  expect(errors).toEqual([]);
});

test('OAuth configuration activates login and public maintenance remains visible', async ({ page, request }) => {
  await page.goto('http://127.0.0.1:4312');
  await expect(page.getByRole('link', { name: 'Login with Discord' })).toHaveAttribute('href', '/auth/discord');
  await expect(page.locator('.dot-maintenance')).toHaveCount(6);
  await expect(page.getByRole('alert')).toContainText('Connection issues');
  expect((await request.get('http://127.0.0.1:4312/api/internal/docs')).status()).toBe(401);
  for (const variant of ['staff', 'public', 'image']) {
    const files = await readdir(`dist/${variant}/assets`);
    const bundle = (await Promise.all(files.map(file => readFile(`dist/${variant}/assets/${file}`, 'utf8')))).join('');
    for (const secret of ['BUNDLE-SECRET-SENTINEL', '111111111111111111', 'DISCORD_CLIENT_SECRET', 'DISCORD_ALLOWED_USER_IDS', 'INTERNAL-DOC-SENTINEL', 'docs/internal']) expect(bundle).not.toContain(secret);
  }
});

test('Cookbook reader searches real guides, navigates on mobile and hides on sign out', async ({ page, request, context }) => {
  let authorized = false;
  await page.route('**/api/session', route => route.fulfill({ json: { authenticated: true, internalAccess: authorized, loginAvailable: true, user: { username: 'test-user', displayName: 'Test Crew', avatarUrl: '/diamondcrew-logo.png' }, csrfToken: 'test-fixture' } }));
  await page.goto('http://127.0.0.1:4310');
  await expect(page.getByText('No internal access', { exact: true })).toBeVisible();
  await expect(page.locator('.documentation')).toHaveCount(0);
  await expect(page.locator('.launch-card')).toHaveCount(8);
  await expect(page.getByRole('heading', { name: 'Vítej, Test Crew!' })).toBeVisible();
  authorized = true;
  await page.route('**/api/internal/docs/**', async route => {
    const url = route.request().url().replace('/api/internal/docs/', '/api/cookbook/');
    const response = await request.get(url);
    const json = await response.json();
    if (json.markdown) json.markdown += '\n\n<script>window.badMarkdown=true</script>\n\n<img src=x onerror="window.badMarkdown=true">';
    await route.fulfill({ json });
  });
  await page.reload();
  await expect(page.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/docs');
  await expect(page.locator('.documentation')).toHaveCount(0);
  // Only the UI fixture supplies a docs shell; real /docs auth is tested at the server.
  await page.route('**/docs', async route => route.fulfill({ response: await request.get('http://127.0.0.1:4310/') }));
  await page.getByRole('link', { name: 'Documentation' }).click();
  await page.setViewportSize({ width: 1440, height: 1050 });
  await expect(page.getByRole('heading', { name: 'Infrastructure Cookbook', exact: true })).toBeVisible();
  await expect(page.locator('.category-toggle')).toHaveCount(22);
  await expect(page.locator('.markdown h1')).toBeVisible();
  await page.getByRole('textbox', { name: 'Search Cookbook' }).fill('Wings');
  await page.getByLabel('Cookbook search filter').selectOption('ai');
  await expect(page.locator('.search-results button').first()).toBeVisible();
  await expect(page.locator('.search-results button small').first()).toContainText('AI');
  await page.locator('.search-results button').first().click();
  await expect(page.locator('.markdown pre').first()).toBeVisible();
  await expect(page.locator('.cookbook-toc a').first()).toBeVisible();
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.locator('.copy-code').first().click();
  await expect(page.locator('.copy-code').first()).toHaveText('Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).not.toBe('');
  await page.screenshot({ path: '.artifacts/cookbook-desktop.png', fullPage: true });
  await page.locator('.page-pagination button').last().click();
  await expect(page.locator('.markdown h1')).toBeVisible();
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.getByRole('button', { name: 'Browse guide categories' }).click();
  await expect(page.getByRole('navigation', { name: 'Cookbook categories' })).toBeVisible();
  await page.getByRole('button', { name: 'Close guide navigation' }).click();
  await page.screenshot({ path: '.artifacts/cookbook-mobile.png', fullPage: true });
  expect(await page.evaluate(() => (window as any).badMarkdown)).toBeUndefined();
  await page.route('**/auth/logout', route => { authorized = false; return route.fulfill({ status: 204 }); });
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page.locator('.documentation')).toHaveCount(0);
});

test('direct docs/backend source URLs cannot bypass auth in production or development', async ({ request }) => {
  for (const port of [4310, 4311, 4313]) {
    for (const pathname of ['/docs/internal/01-getting-started/index.md', '/docs/internal/01-getting-started/index.md?raw', '/server/config.ts?raw', '/@fs/' + process.cwd().replaceAll('\\', '/') + '/docs/internal/01-getting-started/index.md?raw']) {
      const response = await request.get(`http://127.0.0.1:${port}${pathname}`);
      expect([403, 404]).toContain(response.status());
    }
  }
});
