import { Hono } from "hono";
import workersRoutes from "./workers.tsx";
import areasRoutes from "./areas.tsx";
import { basicAuth } from "hono/basic-auth";
import { Base } from "../components/layouts/Base.tsx";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";

const app = new Hono();

app.get("/", (c) => {
  return c.html(
    <Base title="Mapant.fr server">
      <h1>Mapant.fr server</h1>

      <p>
        <a href="/workers">Workers dashboard</a>
      </p>

      <p>
        <a href="/areas">Areas</a>
      </p>
    </Base>
  );
});

app.route("/workers", workersRoutes);
app.route("/areas", areasRoutes);

export default app;
