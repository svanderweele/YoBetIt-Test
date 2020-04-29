# ************************************************************
# Sequel Pro SQL dump
# Version 5224
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 8.0.20)
# Database: Casino
# Generation Time: 2020-04-29 03:32:08 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table countries
# ------------------------------------------------------------

DROP TABLE IF EXISTS `countries`;

CREATE TABLE `countries` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;

INSERT INTO `countries` (`id`, `name`)
VALUES
	(1,'Malta'),
	(2,'Spain'),
	(3,'Italy'),
	(4,'France'),
	(5,'Scotland'),
	(6,'The Netherlands'),
	(7,'Russia');

/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table game_country_pivot
# ------------------------------------------------------------

DROP TABLE IF EXISTS `game_country_pivot`;

CREATE TABLE `game_country_pivot` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `country_id` int unsigned NOT NULL,
  `game_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `country_fkey` (`country_id`),
  KEY `game_fkey` (`game_id`),
  CONSTRAINT `country_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  CONSTRAINT `game_fkey` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `game_country_pivot` WRITE;
/*!40000 ALTER TABLE `game_country_pivot` DISABLE KEYS */;

INSERT INTO `game_country_pivot` (`id`, `country_id`, `game_id`)
VALUES
	(1,1,1),
	(2,3,1),
	(3,5,2),
	(4,2,3);

/*!40000 ALTER TABLE `game_country_pivot` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table game_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `game_types`;

CREATE TABLE `game_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `game_types` WRITE;
/*!40000 ALTER TABLE `game_types` DISABLE KEYS */;

INSERT INTO `game_types` (`id`, `name`)
VALUES
	(1,'Slots'),
	(2,'Craps'),
	(3,'Roulette'),
	(4,'Blackjack'),
	(5,'Poker');

/*!40000 ALTER TABLE `game_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table games
# ------------------------------------------------------------

DROP TABLE IF EXISTS `games`;

CREATE TABLE `games` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `game_type_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `game_type_fkey` (`game_type_id`),
  CONSTRAINT `game_type_fkey` FOREIGN KEY (`game_type_id`) REFERENCES `game_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;

INSERT INTO `games` (`id`, `name`, `game_type_id`)
VALUES
	(1,'Waldo\'s World of Winnings',2),
	(2,'Wacky Slots',4),
	(3,'Temple of the Undead Fire Hawk',3);

/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table people
# ------------------------------------------------------------

DROP TABLE IF EXISTS `people`;

CREATE TABLE `people` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `first_name` varchar(255) NOT NULL DEFAULT '',
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;

INSERT INTO `people` (`id`, `email`, `first_name`, `last_name`, `created_at`, `updated_at`, `deleted_at`)
VALUES
	(1,'simon@dev.com','Simon','van der Weele','2020-05-29 04:44:23','2020-05-29 04:44:23',NULL),
	(2,'amanda@dev.com','Amanda','Seymour','2020-04-12 16:21:12','2020-04-12 16:21:12',NULL),
	(3,'joy@dev.com','Joy','Fletcher','2020-03-22 08:20:12','2020-03-22 08:20:12',NULL);

/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table people_favourite_games_pivot
# ------------------------------------------------------------

DROP TABLE IF EXISTS `people_favourite_games_pivot`;

CREATE TABLE `people_favourite_games_pivot` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `person_id` int unsigned NOT NULL,
  `game_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_fkey` (`game_id`),
  KEY `user_fkey` (`person_id`),
  CONSTRAINT `fav_game_fkey` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`),
  CONSTRAINT `person_fkey` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `people_favourite_games_pivot` WRITE;
/*!40000 ALTER TABLE `people_favourite_games_pivot` DISABLE KEYS */;

INSERT INTO `people_favourite_games_pivot` (`id`, `person_id`, `game_id`)
VALUES
	(1,1,1),
	(2,1,3),
	(3,2,2),
	(4,3,1),
	(5,3,1);

/*!40000 ALTER TABLE `people_favourite_games_pivot` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table people_roles_pivot
# ------------------------------------------------------------

DROP TABLE IF EXISTS `people_roles_pivot`;

CREATE TABLE `people_roles_pivot` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `person_id` int unsigned NOT NULL,
  `role_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_fkey` (`role_id`),
  KEY `user_fkey` (`person_id`),
  CONSTRAINT `role_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `user_fkey` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `people_roles_pivot` WRITE;
/*!40000 ALTER TABLE `people_roles_pivot` DISABLE KEYS */;

INSERT INTO `people_roles_pivot` (`id`, `person_id`, `role_id`)
VALUES
	(1,1,3),
	(2,1,4);

/*!40000 ALTER TABLE `people_roles_pivot` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;

INSERT INTO `roles` (`id`, `name`)
VALUES
	(1,'Customer'),
	(2,'Database Manager'),
	(3,'Cleaner'),
	(4,'Web Admin'),
	(5,'Software Developer'),
	(6,'Table Manager');

/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
