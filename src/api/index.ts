import { Hono } from "hono";
import areasRoutes from "./areas.ts";

const app = new Hono();
app.route("/areas", areasRoutes);

export default app;
