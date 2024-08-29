import { Hono } from "hono";
import { db } from "../db/db";
import { workersTable } from "../db/schema";
import { Base } from "../components/layouts/Base";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";

const app = new Hono();

app.get("/", (c) => {
  const allWorkers = db
    .select({ name: workersTable.name, id: workersTable.id })
    .from(workersTable)
    .all();

  return c.html(
    <Base title="Workers">
      <h1>All workers</h1>

      <ul>
        {allWorkers.map((worker) => (
          <li>
            <a href={`/workers/${worker.id}`}>{worker.name}</a>
          </li>
        ))}
      </ul>

      <h2>Add new worker</h2>

      <form method="post">
        <label>
          Name
          <input type="text" name="name" />
        </label>

        <button type="submit">Create</button>
      </form>
    </Base>
  );
});

app.post("/", async (c) => {
  const formData = await c.req.formData();
  const name = formData.get("name");
  if (typeof name !== "string") throw new HTTPException(400);

  const [newWorker] = await db
    .insert(workersTable)
    .values({ name })
    .returning();

  return c.redirect(`/workers/${newWorker.id}`);
});

app.get("/:id", (c) => {
  const worker = db
    .select({ name: workersTable.name, id: workersTable.id })
    .from(workersTable)
    .where(eq(workersTable.id, c.req.param("id")))
    .get();

  if (worker === undefined) throw new HTTPException(404);

  return c.html(
    <Base
      title={`Workers | ${worker.name}`}
      headChildren={
        <script
          src="https://unpkg.com/htmx.org@2.0.2"
          integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ"
          crossorigin="anonymous"
          defer
        ></script>
      }
    >
      <a href="/workers">Back</a>
      <h1>Worker: {worker.name}</h1>

      <button
        type="button"
        hx-post={`/workers/${worker.id}/generate-api-key`}
        hx-trigger="click"
        hx-target="#api-key"
        hx-swap="innerHTML"
      >
        Generate API key
        <span class="htmx-indicator">...</span>
      </button>

      <p id="api-key"></p>
    </Base>
  );
});

app.post("/:id/generate-api-key", async (c) => {
  const randomKey = generateIdFromEntropySize(40);
  const hash = await Bun.password.hash(randomKey);
  db.update(workersTable).set({ hashedApiKey: hash }).run();
  return c.text(randomKey);
});

export default app;
