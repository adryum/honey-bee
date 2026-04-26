-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.3.0 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for honey_bee
CREATE DATABASE IF NOT EXISTS `honey_bee` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `honey_bee`;

-- Dumping structure for table honey_bee.apiaries
CREATE TABLE IF NOT EXISTS `apiaries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `location` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `user_id_creator` bigint DEFAULT NULL,
  `creation_timestamp` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `FK_apiary_user` (`user_id_creator`) USING BTREE,
  CONSTRAINT `FK_apiaries_users` FOREIGN KEY (`user_id_creator`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.apiary_action_history
CREATE TABLE IF NOT EXISTS `apiary_action_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `user_id` bigint DEFAULT NULL,
  `history_action_type_id` bigint NOT NULL,
  `apiary_id` bigint NOT NULL,
  `creation_timestamp` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `FK_apiary_history_users` (`user_id`),
  KEY `FK_apiary_history_apiaries` (`apiary_id`),
  KEY `FK_apiary_action_history_history_action_types` (`history_action_type_id`) USING BTREE,
  CONSTRAINT `FK_apiary_action_history_history_action_types` FOREIGN KEY (`history_action_type_id`) REFERENCES `history_action_types` (`id`),
  CONSTRAINT `FK_apiary_history_apiaries` FOREIGN KEY (`apiary_id`) REFERENCES `apiaries` (`id`),
  CONSTRAINT `FK_apiary_history_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.history_action_types
CREATE TABLE IF NOT EXISTS `history_action_types` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.hives
CREATE TABLE IF NOT EXISTS `hives` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `location` varchar(50) DEFAULT NULL,
  `type` enum('Stationary','Movable','Tower') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `apiaryId` bigint DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT (now()),
  `calendarId` text,
  PRIMARY KEY (`id`),
  KEY `FK_hives_apiaries` (`apiaryId`) USING BTREE,
  KEY `FK_hive_user` (`userId`) USING BTREE,
  CONSTRAINT `FK_hives_apiaries` FOREIGN KEY (`apiaryId`) REFERENCES `apiaries` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_hives_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.hive_action_history
CREATE TABLE IF NOT EXISTS `hive_action_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `text` varchar(200) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `hive_id` bigint NOT NULL,
  `history_action_type_id` bigint NOT NULL,
  `creation_timestamp` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `FK_hivehistory_users` (`user_id`) USING BTREE,
  KEY `FK_hivehistory_hives` (`hive_id`) USING BTREE,
  KEY `FK_hive_action_history_history_action_types` (`history_action_type_id`) USING BTREE,
  CONSTRAINT `FK_hive_action_history_history_action_types` FOREIGN KEY (`history_action_type_id`) REFERENCES `history_action_types` (`id`),
  CONSTRAINT `FK_hivehistory_hives` FOREIGN KEY (`hive_id`) REFERENCES `hives` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_hivehistory_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.hive_honey_production
CREATE TABLE IF NOT EXISTS `hive_honey_production` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` float DEFAULT '0',
  `hiveId` bigint NOT NULL,
  `inspectionId` bigint NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `inspectionId_idx` (`inspectionId`),
  KEY `hiveId_idx` (`hiveId`),
  CONSTRAINT `hiveId_FK1` FOREIGN KEY (`hiveId`) REFERENCES `hives` (`id`),
  CONSTRAINT `inspectionId_FK1` FOREIGN KEY (`inspectionId`) REFERENCES `hive_inspections` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.hive_inspections
CREATE TABLE IF NOT EXISTS `hive_inspections` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `processed` tinyint(1) NOT NULL DEFAULT '0',
  `apiary_id` bigint DEFAULT NULL,
  `user_id_creator` bigint DEFAULT NULL,
  `creation_timestamp` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `apiaryId_idx` (`apiary_id`) USING BTREE,
  KEY `userId_idx` (`user_id_creator`) USING BTREE,
  CONSTRAINT `apiaryId` FOREIGN KEY (`apiary_id`) REFERENCES `apiaries` (`id`) ON DELETE SET NULL,
  CONSTRAINT `userId` FOREIGN KEY (`user_id_creator`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.hive_inspection_forms
CREATE TABLE IF NOT EXISTS `hive_inspection_forms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `abnormal_behavior` tinyint(1) NOT NULL,
  `abnormal_behavior_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `swarming` tinyint(1) NOT NULL,
  `need_feeding` tinyint(1) NOT NULL,
  `queen_alive` tinyint(1) NOT NULL,
  `queen_laying_eggs` tinyint(1) NOT NULL,
  `queen_laying_eggs_incorrectly` tinyint(1) NOT NULL,
  `need_more_honey_frames` tinyint(1) NOT NULL,
  `need_more_honey_frames_amount` int DEFAULT NULL,
  `need_more_breeding_frames` tinyint(1) NOT NULL,
  `need_more_breeding_frames_amount` int DEFAULT NULL,
  `need_medical_attention` tinyint(1) NOT NULL,
  `need_medical_attention_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `has_hive_damage` tinyint(1) NOT NULL,
  `has_hive_damage_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `taking_frames` tinyint(1) NOT NULL,
  `taken_honey_frames` int DEFAULT NULL,
  `taken_breeding_frames` int DEFAULT NULL,
  `inspection_id` bigint NOT NULL,
  `hive_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inpsectionId_idx` (`inspection_id`) USING BTREE,
  KEY `hiveId_idx` (`hive_id`) USING BTREE,
  CONSTRAINT `hiveId` FOREIGN KEY (`hive_id`) REFERENCES `hives` (`id`) ON DELETE SET NULL,
  CONSTRAINT `inpsectionId` FOREIGN KEY (`inspection_id`) REFERENCES `hive_inspections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.hive_queen_history
CREATE TABLE IF NOT EXISTS `hive_queen_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `time_spent_in_hive` varchar(50) NOT NULL DEFAULT '0',
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `species_id` bigint NOT NULL DEFAULT '0',
  `hive_id` bigint DEFAULT NULL,
  `placed_here_timestamp` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `FK_hive_bee_history_bee_species` (`species_id`),
  KEY `FK_hive_bee_history_hives` (`hive_id`),
  CONSTRAINT `FK_hive_bee_history_bee_species` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`),
  CONSTRAINT `FK_hive_bee_history_hives` FOREIGN KEY (`hive_id`) REFERENCES `hives` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.notes
CREATE TABLE IF NOT EXISTS `notes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `creationDate` datetime DEFAULT NULL,
  `type` enum('WARNING','INFORMATIONAL') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  `hiveId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_notes_users` (`userId`) USING BTREE,
  KEY `FK_notes_hives` (`hiveId`),
  CONSTRAINT `FK_notes_hives` FOREIGN KEY (`hiveId`) REFERENCES `hives` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_notes_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.queens
CREATE TABLE IF NOT EXISTS `queens` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `born_date` datetime NOT NULL,
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `species_id` bigint NOT NULL DEFAULT '0',
  `hive_id` bigint NOT NULL,
  `added_to_hive_date` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `FK_bees_bee_species` (`species_id`) USING BTREE,
  KEY `FK_bees_hives` (`hive_id`),
  CONSTRAINT `FK_bees_bee_species` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`),
  CONSTRAINT `FK_bees_hives` FOREIGN KEY (`hive_id`) REFERENCES `hives` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.species
CREATE TABLE IF NOT EXISTS `species` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `known_as_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `scientific_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `life_expectancy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text NOT NULL,
  `behavior` text NOT NULL,
  `preferences` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `password` varchar(30) NOT NULL DEFAULT '',
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `role` enum('ADMINISTRATOR','APIARY_MAINTAINER','MANAGEMENT','HIVE_WORKER') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `provider` enum('GOOGLE') DEFAULT NULL,
  `providerSub` varchar(255) DEFAULT NULL,
  `googleRefreshToken` text,
  `isWhitelisted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.user_apiary_access
CREATE TABLE IF NOT EXISTS `user_apiary_access` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `apiary_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__apiaries` (`apiary_id`) USING BTREE,
  KEY `FK__users` (`user_id`) USING BTREE,
  CONSTRAINT `FK__apiaries` FOREIGN KEY (`apiary_id`) REFERENCES `apiaries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK__users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.user_hive_access
CREATE TABLE IF NOT EXISTS `user_hive_access` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL DEFAULT '0',
  `hive_id` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_userhiveaccess_hives` (`hive_id`) USING BTREE,
  KEY `FK_userhiveaccess_users` (`user_id`) USING BTREE,
  CONSTRAINT `FK_userhiveaccess_hives` FOREIGN KEY (`hive_id`) REFERENCES `hives` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_userhiveaccess_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table honey_bee.whitelist
CREATE TABLE IF NOT EXISTS `whitelist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(60) DEFAULT NULL,
  `role` enum('ADMINISTRATOR','APIARY_MAINTAINER','MANAGEMENT','HIVE_WORKER') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
