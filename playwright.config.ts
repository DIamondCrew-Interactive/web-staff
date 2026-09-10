import { defineConfig } from "@playwright/test";

const password = "browser-test-password-only-123";
export default defineConfig({
  testDir: "./tests/browser",
  outputDir: ".artifacts/playwright",
  fullyParallel: false,
  use: {
    browserName: "chromium",
    headless: true,
    httpCredentials: { username: "test-crew", password },
  },
  webServer: [
    {
      command: "node build/server/index.js",
      url: "http://127.0.0.1:4310/healthz",
      env: {
        NODE_ENV: "production",
        APP_VARIANT: "staff",
        PORT: "4310",
        DATA_MODE: "demo",
        STAFF_USERNAME: "test-crew",
        STAFF_PASSWORD: password,
      },
      reuseExistingServer: false,
    },
    {
      command: "node build/server/index.js",
      url: "http://127.0.0.1:4311/healthz",
      env: {
        NODE_ENV: "production",
        APP_VARIANT: "public",
        PORT: "4311",
        DATA_MODE: "demo",
      },
      reuseExistingServer: false,
    },
    {
      command: "node build/server/index.js",
      url: "http://127.0.0.1:4312/healthz",
      env: {
        NODE_ENV: "production",
        APP_VARIANT: "public",
        PORT: "4312",
        DATA_MODE: "live",
        PTERODACTYL_SERVERS: "[]",
        PUBLIC_INCIDENT_TITLE: "Connection issues",
        PUBLIC_INCIDENT_MESSAGE: "We are investigating connectivity.",
        PUBLIC_MAINTENANCE: "true",
      },
      reuseExistingServer: false,
    },
  ],
});
