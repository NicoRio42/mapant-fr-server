import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { generateId } from "lucia";

const id = text("id")
  .primaryKey()
  .notNull()
  .$defaultFn(() => generateId(15));

export const tilesTable = sqliteTable("tiles", {
  id,
  minX: real("min_x").notNull(),
  minY: real("min_y").notNull(),
  max_x: real("max_x").notNull(),
  max_y: real("max_y").notNull(),
  lidarFileUrl: text("lidar_file_url").notNull(),
  lidarProcessed: integer("lidar_processed", { mode: "boolean" }).notNull(),
  mapRendered: integer("map_rendered", { mode: "boolean" }).notNull(),
  pyramidGenerated: integer("pyramid_generated", { mode: "boolean" }).notNull(),
  workerInChargeId: text("worker_in_charge_id").notNull(),
});
