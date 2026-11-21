CREATE TABLE `callbacks` (
	`id` text PRIMARY KEY NOT NULL,
	`phone` text NOT NULL,
	`grade` text NOT NULL,
	`board` text NOT NULL,
	`slot` text NOT NULL,
	`status` text DEFAULT 'Pending' NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
