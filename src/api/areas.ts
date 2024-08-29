import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

// app.get("/", (c) => {});

app.post(
  "/",
  zValidator(
    "json",
    z.object({
      minX: z.number(),
      minY: z.number(),
      maxX: z.number(),
      maxY: z.number(),
    })
  ),
  (c) => {
    const data = c.req.valid("json");
    console.log(data);
    return c.text("", 202);
  }
);

export default app;
