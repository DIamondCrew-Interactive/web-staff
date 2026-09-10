import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { config } from "./config.js";
import { createApp } from "./app.js";

const app = createApp();
const html = config.variant === "public" ? "public.html" : "index.html";
if (config.production) {
  const root = path.resolve(`dist/${config.variant}`);
  app.use(express.static(root, { index: false }));
  app.get("/", (_req, res) => res.sendFile(path.join(root, html)));
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.get("/", async (req, res) =>
    res
      .type("html")
      .send(
        await vite.transformIndexHtml(
          req.originalUrl,
          await fs.readFile(html, "utf8"),
        ),
      ),
  );
  app.use(vite.middlewares);
}
app.use((_req, res) => res.status(404).send("Not found"));
app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(
      "Request failed:",
      error instanceof Error ? error.name : "Unknown error",
    );
    res.status(503).json({ error: "Status temporarily unavailable" });
  },
);
const server = app.listen(config.port, "0.0.0.0", () =>
  console.log(
    `DiamondCrew ${config.variant} listening on :${config.port} (${config.mode})`,
  ),
);
for (const signal of ["SIGTERM", "SIGINT"])
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
  });
