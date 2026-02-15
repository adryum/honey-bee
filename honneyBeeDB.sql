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
  `name` varchar(50) DEFAULT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `location` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_apiary_user` (`userId`) USING BTREE,
  CONSTRAINT `FK_apiaries_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.apiaries: ~2 rows (approximately)

-- Dumping structure for table honey_bee.hivehistory
CREATE TABLE IF NOT EXISTS `hivehistory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `text` varchar(200) DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  `hiveId` bigint DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_hivehistory_users` (`userId`),
  KEY `FK_hivehistory_hives` (`hiveId`),
  CONSTRAINT `FK_hivehistory_hives` FOREIGN KEY (`hiveId`) REFERENCES `hives` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_hivehistory_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.hivehistory: ~0 rows (approximately)

-- Dumping structure for table honey_bee.hives
CREATE TABLE IF NOT EXISTS `hives` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `location` varchar(50) DEFAULT NULL,
  `type` enum('Stationary','Movable','Tower') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `apiaryId` bigint DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT NULL,
  `calendarId` text,
  PRIMARY KEY (`id`),
  KEY `FK_hives_apiaries` (`apiaryId`) USING BTREE,
  KEY `FK_hive_user` (`userId`) USING BTREE,
  CONSTRAINT `FK_hives_apiaries` FOREIGN KEY (`apiaryId`) REFERENCES `apiaries` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_hives_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.hives: ~4 rows (approximately)
INSERT INTO `hives` (`id`, `name`, `image`, `location`, `type`, `description`, `apiaryId`, `userId`, `creationDate`, `calendarId`) VALUES
	(73, 'niga', NULL, NULL, 'Stationary', 'fr', NULL, NULL, NULL, '95ef0835061e39b4b4fca24b8445cab54b32db312011a68754f4dccd78a6f761@group.calendar.google.com'),
	(74, '123', NULL, NULL, 'Stationary', '123', NULL, NULL, NULL, '973b2fc67ade434668e041fbf479bf8e49e5b022deec2a1107ffbb91be1cf103@group.calendar.google.com'),
	(75, '123', NULL, NULL, 'Stationary', '123', NULL, NULL, NULL, '0203fd148f850f4f3b703e34ba1a494edf94baecbb9a3df1bdb18459c50e80fb@group.calendar.google.com'),
	(76, 'qwe', 'https://res.cloudinary.com/dj8lvgcxl/image/upload/v1771171940/apiaries/User:18_Apiary:76.jpg', NULL, 'Stationary', 'qwe', NULL, NULL, NULL, '426a6399cbdae5cb6a5b9bb7d2091a1ea5a43c8431370125f176d58066e7d5ae@group.calendar.google.com');

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
  CONSTRAINT `FK_notes_hives` FOREIGN KEY (`hiveId`) REFERENCES `hives` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_notes_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.notes: ~0 rows (approximately)

-- Dumping structure for table honey_bee.userapiaryaccess
CREATE TABLE IF NOT EXISTS `userapiaryaccess` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userId` bigint DEFAULT NULL,
  `apiaryId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__apiaries` (`apiaryId`),
  KEY `FK__users` (`userId`),
  CONSTRAINT `FK__apiaries` FOREIGN KEY (`apiaryId`) REFERENCES `apiaries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK__users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.userapiaryaccess: ~0 rows (approximately)

-- Dumping structure for table honey_bee.userhiveaccess
CREATE TABLE IF NOT EXISTS `userhiveaccess` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userId` bigint NOT NULL DEFAULT '0',
  `hiveId` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_userhiveaccess_hives` (`hiveId`),
  KEY `FK_userhiveaccess_users` (`userId`),
  CONSTRAINT `FK_userhiveaccess_hives` FOREIGN KEY (`hiveId`) REFERENCES `hives` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_userhiveaccess_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.userhiveaccess: ~1 rows (approximately)

-- Dumping structure for table honey_bee.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `password` varchar(30) NOT NULL DEFAULT '',
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `role` enum('ADMINISTRATOR','APIARY_MAINTAINER','MANAGEMENT','HIVE_WORKER') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `provider` enum('GOOGLE') DEFAULT NULL,
  `providerSub` varchar(255) DEFAULT NULL,
  `googleRefreshToken` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.users: ~1 rows (approximately)

-- Dumping structure for table honey_bee.whitelist
CREATE TABLE IF NOT EXISTS `whitelist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(60) DEFAULT NULL,
  `role` enum('ADMINISTRATOR','APIARY_MAINTAINER','MANAGEMENT','HIVE_WORKER') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.whitelist: ~0 rows (approximately)
INSERT INTO `whitelist` (`id`, `email`, `role`, `status`) VALUES
	(2, 'adiskir@gmail.com', 'ADMINISTRATOR', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
