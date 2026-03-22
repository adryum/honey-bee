-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `apiaries` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`image` text,
	`location` varchar(50),
	`description` varchar(500),
	`userId` bigint,
	`creationDate` timestamp,
	CONSTRAINT `apiaries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hivehistory` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`text` varchar(200),
	`userId` bigint,
	`hiveId` bigint,
	`creationDate` timestamp,
	CONSTRAINT `hivehistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hives` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`image` text,
	`location` varchar(50),
	`type` enum('Stationary','Movable','Tower'),
	`description` varchar(500),
	`apiaryId` bigint,
	`userId` bigint,
	`creationDate` timestamp,
	`calendarId` text,
	CONSTRAINT `hives_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notes` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`title` varchar(30),
	`content` varchar(500),
	`creationDate` datetime,
	`type` enum('WARNING','INFORMATIONAL'),
	`userId` bigint,
	`hiveId` bigint,
	CONSTRAINT `notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userapiaryaccess` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`userId` bigint,
	`apiaryId` bigint,
	CONSTRAINT `userapiaryaccess_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userhiveaccess` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`userId` bigint NOT NULL DEFAULT 0,
	`hiveId` bigint NOT NULL DEFAULT 0,
	CONSTRAINT `userhiveaccess_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`username` varchar(20) NOT NULL,
	`email` varchar(30) NOT NULL DEFAULT '',
	`password` varchar(30) NOT NULL DEFAULT '',
	`image` text,
	`role` enum('ADMINISTRATOR','APIARY_MAINTAINER','MANAGEMENT','HIVE_WORKER'),
	`provider` enum('GOOGLE'),
	`providerSub` varchar(255),
	`googleRefreshToken` text,
	`isWhitelisted` tinyint(1) NOT NULL DEFAULT 0,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `whitelist` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`email` varchar(60),
	`role` enum('ADMINISTRATOR','APIARY_MAINTAINER','MANAGEMENT','HIVE_WORKER'),
	`status` tinyint DEFAULT 0,
	CONSTRAINT `whitelist_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `apiaries` ADD CONSTRAINT `FK_apiaries_users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hivehistory` ADD CONSTRAINT `FK_hivehistory_hives` FOREIGN KEY (`hiveId`) REFERENCES `hives`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hivehistory` ADD CONSTRAINT `FK_hivehistory_users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hives` ADD CONSTRAINT `FK_hives_apiaries` FOREIGN KEY (`apiaryId`) REFERENCES `apiaries`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hives` ADD CONSTRAINT `FK_hives_users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notes` ADD CONSTRAINT `FK_notes_hives` FOREIGN KEY (`hiveId`) REFERENCES `hives`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notes` ADD CONSTRAINT `FK_notes_users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userapiaryaccess` ADD CONSTRAINT `FK__apiaries` FOREIGN KEY (`apiaryId`) REFERENCES `apiaries`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userapiaryaccess` ADD CONSTRAINT `FK__users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userhiveaccess` ADD CONSTRAINT `FK_userhiveaccess_hives` FOREIGN KEY (`hiveId`) REFERENCES `hives`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userhiveaccess` ADD CONSTRAINT `FK_userhiveaccess_users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `FK_apiary_user` ON `apiaries` (`userId`);--> statement-breakpoint
CREATE INDEX `FK_hive_user` ON `hives` (`userId`);
*/