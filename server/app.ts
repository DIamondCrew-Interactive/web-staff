import express from "express";
import { createHash, timingSafeEqual } from "node:crypto";
import { config } from "./config.js";
import { getSnapshot, toPublic } from "./monitoring.js";

function same(a: string, b: string) {
  return timingSafeEqual(
    createHash("sha256").update(a).digest(),
    createHash("sha256").update(b).digest(),
  );
}
export function createApp(variant = config.variant) {
  const app = express();
  app.disable("x-powered-by");
  app.use((_req, res, next) => {
    res.set({
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "X-Frame-Options": "DENY",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    });
    if (config.production)
      res.set(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
      );
    next();
  });
  app.get("/healthz", (_req, res) => res.json({ status: "ok" }));
  if (variant === "staff") {
    app.use((_req, res, next) => {
      res.set({
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      });
      if (!config.production && !config.username && !config.password)
        return next();
      const auth = _req.headers.authorization || "";
      const decoded = auth.startsWith("Basic ")
        ? Buffer.from(auth.slice(6), "base64").toString()
        : "";
      const split = decoded.indexOf(":");
      const validUser = same(decoded.slice(0, split), config.username);
      const validPassword = same(decoded.slice(split + 1), config.password);
      if (split < 0 || !validUser || !validPassword) {
        res.set(
          "WWW-Authenticate",
          'Basic realm="DiamondCrew Staff Center", charset="UTF-8"',
        );
        res.status(401).send("Staff authentication required");
        return;
      }
      next();
    });
    app.get("/api/staff/status", async (_req, res) =>
      res.json(await getSnapshot()),
    );
  } else {
    app.get("/api/public/status", async (_req, res) => {
      res.set("Cache-Control", "no-store");
      res.json(toPublic(await getSnapshot()));
    });
  }
  app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));
  return app;
}
