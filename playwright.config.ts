import { defineConfig } from '@playwright/test';
const cleanEnv = { DISCORD_CLIENT_ID: '', DISCORD_CLIENT_SECRET: '', DISCORD_REDIRECT_URI: '', DISCORD_ALLOWED_USER_IDS: '', STATUS_TARGETS: '[]', PUBLIC_INCIDENT_TITLE: '', PUBLIC_MAINTENANCE: 'false' };
export default defineConfig({
  testDir: './tests/browser', outputDir: '.artifacts/playwright', fullyParallel: false,
  use: { browserName: 'chromium', headless: true },
  webServer: [
    { command: 'npx tsx tests/fixtures/image-server.ts', url: 'http://127.0.0.1:4314/healthz', env: { ...cleanEnv, NODE_ENV: 'production', APP_VARIANT: 'staff' }, reuseExistingServer: false },
    { command: 'node build/server/index.js', url: 'http://127.0.0.1:4310/healthz', env: { ...cleanEnv, NODE_ENV: 'production', APP_VARIANT: 'staff', PORT: '4310' }, reuseExistingServer: false },
    { command: 'node build/server/index.js', url: 'http://127.0.0.1:4311/healthz', env: { ...cleanEnv, NODE_ENV: 'production', APP_VARIANT: 'public', PORT: '4311' }, reuseExistingServer: false },
    { command: 'node build/server/index.js', url: 'http://127.0.0.1:4312/healthz', env: { ...cleanEnv, NODE_ENV: 'production', APP_VARIANT: 'staff', PORT: '4312', DISCORD_CLIENT_ID: '333333333333333333', DISCORD_CLIENT_SECRET: 'BUNDLE-SECRET-SENTINEL', DISCORD_REDIRECT_URI: 'https://staff.diamondcrew.net/auth/discord/callback', DISCORD_ALLOWED_USER_IDS: '111111111111111111', PUBLIC_INCIDENT_TITLE: 'Connection issues', PUBLIC_MAINTENANCE: 'true' }, reuseExistingServer: false },
    { command: 'npx tsx server/index.ts', url: 'http://127.0.0.1:4313/healthz', env: { ...cleanEnv, NODE_ENV: 'development', APP_VARIANT: 'staff', PORT: '4313' }, reuseExistingServer: false },
  ],
});
