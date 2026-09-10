import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { config, readServers, validateBaseUrl } from "../server/config.js";
import { createApp } from "../server/app.js";
import { getSnapshot, toPublic } from "../server/monitoring.js";
import { services } from "../src/config/services.js";

test("only the requested manager is enabled; all remaining launchers are in progress", () => {
  assert.deepEqual(
    services.filter((s) => s.enabled).map((s) => s.id),
    ["manager"],
  );
  assert.ok(
    services.filter((s) => !s.enabled).every((s) => s.status === "IN PROGRESS"),
  );
});
test("public projection cannot leak internal hosts, ports or identifiers", async () => {
  const snapshot = structuredClone(await getSnapshot());
  snapshot.servers.push({
    id: "SECRET-ID",
    name: "SECRET-NAME",
    project: "DiamondCrew Roleplay",
    environment: "DEV",
    port: 30131,
    node: "SECRET-HOST",
    online: true,
    cpu: 99,
    ramMb: 999,
    players: 2,
    maxPlayers: 64,
    uptimeSeconds: 15,
  });
  const output = toPublic(snapshot);
  const json = JSON.stringify(output);
  for (const privateValue of [
    "SECRET",
    "DIA-01",
    "30131",
    "Cockpit",
    "Proxy Manager",
    "panel.diamondcrew.net",
    "cpu",
    "ramMb",
  ])
    assert.ok(!json.includes(privateValue), privateValue);
  assert.deepEqual(
    output.services.map((s) => s.id),
    ["diamondcrew", "prismatic", "web", "infrastructure"],
  );
  const live = toPublic({ ...snapshot, mode: "live" });
  assert.equal(
    live.services[0].status,
    "DEGRADED",
    "DEV availability cannot imply PROD health",
  );
  assert.ok(
    live.services.every(
      (s) => s.uptime === null && s.history.every((h) => h === null),
    ),
  );
});
test("private and public routes are isolated and staff auth is enforced", async () => {
  const previous = { username: config.username, password: config.password };
  config.username = "crew";
  config.password = "test-password-long-enough";
  const staff = createApp("staff").listen(0, "127.0.0.1");
  const publicServer = createApp("public").listen(0, "127.0.0.1");
  await Promise.all([
    once(staff, "listening"),
    once(publicServer, "listening"),
  ]);
  const url = (server: typeof staff) =>
    `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  try {
    assert.equal((await fetch(`${url(staff)}/healthz`)).status, 200);
    assert.equal((await fetch(`${url(staff)}/api/staff/status`)).status, 401);
    assert.equal(
      (
        await fetch(`${url(staff)}/api/staff/status`, {
          headers: {
            Authorization: `Basic ${Buffer.from("crew:wrong-password").toString("base64")}`,
          },
        })
      ).status,
      401,
    );
    const headers = {
      Authorization: `Basic ${Buffer.from("crew:test-password-long-enough").toString("base64")}`,
    };
    assert.equal(
      (await fetch(`${url(staff)}/api/staff/status`, { headers })).status,
      200,
    );
    assert.equal(
      (await fetch(`${url(staff)}/api/public/status`, { headers })).status,
      404,
    );
    assert.equal(
      (await fetch(`${url(publicServer)}/api/staff/status`)).status,
      404,
    );
    assert.equal(
      (await fetch(`${url(publicServer)}/api/public/status`)).status,
      200,
    );
  } finally {
    staff.close();
    publicServer.close();
    Object.assign(config, previous);
  }
});
test("invalid monitoring configuration is rejected before requests", () => {
  assert.throws(() => readServers('[{"id":"../../admin"}]'));
  assert.throws(() => validateBaseUrl("https://user:secret@example.com", true));
  assert.throws(() => validateBaseUrl("http://example.com", true));
  assert.throws(() =>
    validateBaseUrl("https://example.com/path?token=secret", true),
  );
  assert.equal(
    validateBaseUrl("https://example.com", true),
    "https://example.com",
  );
});
