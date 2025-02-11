ALTER TABLE `recurring_transactions` RENAME TO `scheduled_transactions`;--> statement-breakpoint
CREATE TABLE `savings_goals` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`target_amount` real,
	`saved_amount` real,
	`target_date` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_scheduled_transactions` (
	`id` integer PRIMARY KEY NOT NULL,
	`account_id` integer NOT NULL,
	`category_id` integer,
	`type` text NOT NULL,
	`amount` real NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`necessity` text NOT NULL,
	`start_date` text NOT NULL,
	`frequency` text NOT NULL,
	`next_occurrence` integer NOT NULL,
	`end_date` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_scheduled_transactions`("id", "account_id", "category_id", "type", "amount", "title", "description", "necessity", "start_date", "frequency", "next_occurrence", "end_date", "created_at") SELECT "id", "account_id", "category_id", "type", "amount", "title", "description", "necessity", "start_date", "frequency", "next_occurrence", "end_date", "created_at" FROM `scheduled_transactions`;--> statement-breakpoint
DROP TABLE `scheduled_transactions`;--> statement-breakpoint
ALTER TABLE `__new_scheduled_transactions` RENAME TO `scheduled_transactions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;