import { Hono } from "hono";
import pagesRoutes from "./pages/index.tsx";
import apiRoutes from "./api/index.ts";
import { basicAuth } from "hono/basic-auth";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";

const app = new Hono();

app.use(
  "/*",
  basicAuth({
    username: Bun.env.BASIC_AUTH_NAME as string,
    password: Bun.env.BASIC_AUTH_PASSWORD as string,
  })
);

app.use("/static/*", serveStatic({ root: "./" }));
app.use(logger());

app.route("/", pagesRoutes);
app.route("/api", apiRoutes);

export default app;
