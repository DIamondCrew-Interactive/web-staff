import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";

test("staff: responsive dashboard, disabled launchers, filters and refresh", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.goto("http://127.0.0.1:4310");
  await expect(page.getByText("DEMO ENVIRONMENT")).toBeVisible();
  await expect(page.locator(".service-card.disabled")).toHaveCount(6);
  await expect(page.locator(".service-card.disabled a")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /Open Prismatic DEV/ }),
  ).toBeDisabled();
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page.getByRole("button", { name: "PROD", exact: true }).click();
  await expect(page.getByText("No matching servers")).toBeVisible();
  await page.getByRole("button", { name: "DEV", exact: true }).click();
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page
    .getByRole("textbox", { name: "Search game servers" })
    .fill("not-a-server");
  await expect(page.getByText("No matching servers")).toBeVisible();
  await page.getByRole("textbox", { name: "Search game servers" }).fill("");
  await page.getByRole("button", { name: "All environments" }).click();
  await page.getByRole("button", { name: "Refresh status" }).first().click();
  await expect(
    page.getByRole("button", { name: "Refresh status" }).first(),
  ).toBeEnabled();
  await mkdir(".artifacts", { recursive: true });
  await page.screenshot({
    path: ".artifacts/staff-desktop.png",
    fullPage: true,
  });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.locator(".sidebar")).toHaveClass(/open/);
    await page.getByRole("link", { name: "Game servers", exact: true }).click();
    await expect(page.locator(".sidebar")).not.toHaveClass(/open/);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: ".artifacts/staff-mobile.png",
    fullPage: true,
  });
  await page.route("**/api/staff/status", (route) =>
    route.fulfill({ status: 503, body: "{}" }),
  );
  await page.getByRole("button", { name: "Refresh status" }).first().click();
  await expect(page.getByRole("alert")).toContainText(
    "last successful reading",
  );
  expect(errors).toEqual([]);
});

test("public: no private data, responsive view and separate assets", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.goto("http://127.0.0.1:4311");
  await expect(
    page.getByRole("heading", { name: "All systems operational" }),
  ).toBeVisible();
  await expect(page.locator(".public-service")).toHaveCount(4);
  const body = await page.locator("body").innerText();
  for (const term of [
    "Cockpit",
    "Proxy Manager",
    "DIA-01",
    "30131",
    "Server Manager",
  ])
    expect(body).not.toContain(term);
  const script = await page
    .locator('script[type="module"]')
    .getAttribute("src");
  const bundle = await (
    await request.get(`http://127.0.0.1:4311${script}`)
  ).text();
  for (const term of [
    "Cockpit",
    "proxy.diamondcrew.net",
    "admin.diamondcrew.net",
    "DIA-01",
    "tx-dev.pmrp.cz",
  ])
    expect(bundle).not.toContain(term);
  expect(
    (await request.get("http://127.0.0.1:4311/api/staff/status")).status(),
  ).toBe(404);
  expect((await request.get("http://127.0.0.1:4311/index.html")).status()).toBe(
    404,
  );
  await page.screenshot({
    path: ".artifacts/public-desktop.png",
    fullPage: true,
  });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: ".artifacts/public-mobile.png",
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("live public: unknown data, real incident and maintenance states", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4312");
  await expect(
    page.getByRole("heading", { name: "Scheduled maintenance in progress" }),
  ).toBeVisible();
  await expect(page.getByRole("alert")).toContainText("Connection issues");
  await expect(page.locator(".history-unknown")).toHaveCount(240);
  await expect(page.getByText("Uptime data not available")).toHaveCount(4);
  await expect(page.getByText("DEMO ENVIRONMENT")).toHaveCount(0);
});
