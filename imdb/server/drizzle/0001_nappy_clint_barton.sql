ALTER TABLE `actors` ADD `imdb_id` varchar(20);--> statement-breakpoint
ALTER TABLE `actors` ADD `full_name` varchar(255);--> statement-breakpoint
ALTER TABLE `actors` ADD `job` varchar(100) DEFAULT 'actor';--> statement-breakpoint
ALTER TABLE `actors` ADD `created_by` varchar(255);--> statement-breakpoint
ALTER TABLE `actors` ADD `updated_by` varchar(255);--> statement-breakpoint
ALTER TABLE `actors` ADD `deleted_at` timestamp;--> statement-breakpoint
ALTER TABLE `actors` ADD `deleted_by` varchar(255);--> statement-breakpoint
ALTER TABLE `movie_actors` ADD `created_by` varchar(255);--> statement-breakpoint
ALTER TABLE `movie_actors` ADD `updated_by` varchar(255);--> statement-breakpoint
ALTER TABLE `movie_actors` ADD `deleted_at` timestamp;--> statement-breakpoint
ALTER TABLE `movie_actors` ADD `deleted_by` varchar(255);--> statement-breakpoint
ALTER TABLE `movies` ADD `imdb_id` varchar(20);--> statement-breakpoint
ALTER TABLE `movies` ADD `url` varchar(255);--> statement-breakpoint
ALTER TABLE `movies` ADD `primary_title` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `movies` ADD `original_title` varchar(255);--> statement-breakpoint
ALTER TABLE `movies` ADD `type` varchar(50) DEFAULT 'movie';--> statement-breakpoint
ALTER TABLE `movies` ADD `description` text;--> statement-breakpoint
ALTER TABLE `movies` ADD `primary_image` text;--> statement-breakpoint
ALTER TABLE `movies` ADD `content_rating` varchar(10);--> statement-breakpoint
ALTER TABLE `movies` ADD `start_year` int NOT NULL;--> statement-breakpoint
ALTER TABLE `movies` ADD `end_year` int;--> statement-breakpoint
ALTER TABLE `movies` ADD `release_date` varchar(30);--> statement-breakpoint
ALTER TABLE `movies` ADD `language` varchar(50);--> statement-breakpoint
ALTER TABLE `movies` ADD `interests` text;--> statement-breakpoint
ALTER TABLE `movies` ADD `countries_of_origin` text;--> statement-breakpoint
ALTER TABLE `movies` ADD `external_links` text;--> statement-breakpoint
ALTER TABLE `movies` ADD `spoken_languages` text;--> statement-breakpoint
ALTER TABLE `movies` ADD `filming_locations` text;--> statement-breakpoint
ALTER TABLE `movies` ADD `budget` int;--> statement-breakpoint
ALTER TABLE `movies` ADD `gross_worldwide` int;--> statement-breakpoint
ALTER TABLE `movies` ADD `genres` text;--> statement-breakpoint
ALTER TABLE `movies` ADD `is_adult` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `movies` ADD `runtime_minutes` int;--> statement-breakpoint
ALTER TABLE `movies` ADD `average_rating` int;--> statement-breakpoint
ALTER TABLE `movies` ADD `num_votes` int;--> statement-breakpoint
ALTER TABLE `movies` ADD `created_by` varchar(255);--> statement-breakpoint
ALTER TABLE `movies` ADD `updated_by` varchar(255);--> statement-breakpoint
ALTER TABLE `movies` ADD `deleted_at` timestamp;--> statement-breakpoint
ALTER TABLE `movies` ADD `deleted_by` varchar(255);--> statement-breakpoint
ALTER TABLE `producers` ADD `imdb_id` varchar(20);--> statement-breakpoint
ALTER TABLE `producers` ADD `full_name` varchar(255);--> statement-breakpoint
ALTER TABLE `producers` ADD `job` varchar(100) DEFAULT 'producer';--> statement-breakpoint
ALTER TABLE `producers` ADD `created_by` varchar(255);--> statement-breakpoint
ALTER TABLE `producers` ADD `updated_by` varchar(255);--> statement-breakpoint
ALTER TABLE `producers` ADD `deleted_at` timestamp;--> statement-breakpoint
ALTER TABLE `producers` ADD `deleted_by` varchar(255);--> statement-breakpoint
ALTER TABLE `actors` DROP COLUMN `first_name`;--> statement-breakpoint
ALTER TABLE `actors` DROP COLUMN `last_name`;--> statement-breakpoint
ALTER TABLE `actors` DROP COLUMN `date_of_birth`;--> statement-breakpoint
ALTER TABLE `actors` DROP COLUMN `bio`;--> statement-breakpoint
ALTER TABLE `movie_actors` DROP COLUMN `role`;--> statement-breakpoint
ALTER TABLE `movies` DROP COLUMN `title`;--> statement-breakpoint
ALTER TABLE `movies` DROP COLUMN `release_year`;--> statement-breakpoint
ALTER TABLE `movies` DROP COLUMN `plot`;--> statement-breakpoint
ALTER TABLE `movies` DROP COLUMN `duration`;--> statement-breakpoint
ALTER TABLE `movies` DROP COLUMN `poster_url`;--> statement-breakpoint
ALTER TABLE `producers` DROP COLUMN `first_name`;--> statement-breakpoint
ALTER TABLE `producers` DROP COLUMN `last_name`;--> statement-breakpoint
ALTER TABLE `producers` DROP COLUMN `date_of_birth`;--> statement-breakpoint
ALTER TABLE `producers` DROP COLUMN `bio`;