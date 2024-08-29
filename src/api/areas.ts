import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db/db";
import { areasToGenerateTable } from "../db/schema";

const app = new Hono();

app.get("/", (c) => {
  const allAreas = db.select().from(areasToGenerateTable).all();
  return c.json(allAreas);
});

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

    db.insert(areasToGenerateTable)
      .values({
        minX: data.minX,
        minY: data.minY,
        maxX: data.maxX,
        maxY: data.maxY,
      })
      .run();

    return c.text("", 202);
  }
);

export default app;
