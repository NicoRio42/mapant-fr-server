import { Hono } from "hono";
import workersRoutes from "./workers.tsx";
import { basicAuth } from "hono/basic-auth";

const app = new Hono();

app.use(
  "/*",
  basicAuth({
    username: Bun.env.BASIC_AUTH_NAME as string,
    password: Bun.env.BASIC_AUTH_PASSWORD as string,
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/workers", workersRoutes);

export default app;
