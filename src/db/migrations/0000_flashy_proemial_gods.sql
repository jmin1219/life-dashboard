CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`balance` real DEFAULT 0 NOT NULL,
	`currency` text DEFAULT 'KRW' NOT NULL,
	`created_at` integer DEFAULT strftime('%s', 'now') NOT NULL
);
--> statement-breakpoint
CREATE TABLE `budgets` (
	`id` integer PRIMARY KEY NOT NULL,
	`category_id` integer NOT NULL,
	`amount` real NOT NULL,
	`period` text DEFAULT 'monthly' NOT NULL,
	`created_at` integer DEFAULT strftime('%s', 'now') NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`icon` text DEFAULT 'default-icon',
	`color` text DEFAULT '#FFFFFF'
);
--> statement-breakpoint
CREATE TABLE `investments` (
	`id` integer PRIMARY KEY NOT NULL,
	`account_id` integer NOT NULL,
	`asset_name` text NOT NULL,
	`asset_type` text NOT NULL,
	`shares` real DEFAULT 0 NOT NULL,
	`price_per_share` real DEFAULT 0 NOT NULL,
	`total_value` real DEFAULT 0 NOT NULL,
	`date_purchased` integer NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `net_worth_logs` (
	`id` integer PRIMARY KEY NOT NULL,
	`total_assets` real NOT NULL,
	`total_liabilities` real NOT NULL,
	`net_worth` real NOT NULL,
	`date` integer DEFAULT strftime('%s', 'now') NOT NULL
);
--> statement-breakpoint
CREATE TABLE `recurring_transactions` (
	`id` integer PRIMARY KEY NOT NULL,
	`account_id` integer NOT NULL,
	`category_id` integer,
	`type` text NOT NULL,
	`amount` real NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`necessity` text NOT NULL,
	`start_date` integer NOT NULL,
	`frequency` text NOT NULL,
	`next_occurrence` integer NOT NULL,
	`end_date` integer,
	`created_at` integer DEFAULT strftime('%s', 'now') NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY NOT NULL,
	`account_id` integer NOT NULL,
	`category_id` integer,
	`type` text NOT NULL,
	`amount` real NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`necessity` text NOT NULL,
	`date` integer DEFAULT strftime('%s', 'now') NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null
);
