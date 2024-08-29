CREATE TABLE `tiles` (
	`id` text PRIMARY KEY NOT NULL,
	`min_x` real NOT NULL,
	`min_y` real NOT NULL,
	`max_x` real NOT NULL,
	`max_y` real NOT NULL,
	`lidar_file_url` text NOT NULL,
	`lidar_processed` integer NOT NULL,
	`map_rendered` integer NOT NULL,
	`pyramid_generated` integer NOT NULL,
	`worker_in_charge_id` text NOT NULL
);
