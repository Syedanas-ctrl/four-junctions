CREATE TABLE `actors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`date_of_birth` timestamp,
	`bio` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `actors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `movie_actors` (
	`movie_id` int NOT NULL,
	`actor_id` int NOT NULL,
	`role` varchar(100),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `movie_actors_actor_id_movie_id` PRIMARY KEY(`actor_id`,`movie_id`)
);
--> statement-breakpoint
CREATE TABLE `movies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`release_year` int NOT NULL,
	`plot` text,
	`duration` int,
	`producer_id` int NOT NULL,
	`poster_url` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `movies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `producers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`date_of_birth` timestamp,
	`bio` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `producers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `movie_actors` ADD CONSTRAINT `movie_actors_movie_id_movies_id_fk` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `movie_actors` ADD CONSTRAINT `movie_actors_actor_id_actors_id_fk` FOREIGN KEY (`actor_id`) REFERENCES `actors`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `movies` ADD CONSTRAINT `movies_producer_id_producers_id_fk` FOREIGN KEY (`producer_id`) REFERENCES `producers`(`id`) ON DELETE no action ON UPDATE no action;