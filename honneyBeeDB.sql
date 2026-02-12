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
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.apiaries: ~5 rows (approximately)
INSERT INTO `apiaries` (`id`, `name`, `image`, `location`, `description`, `userId`, `creationDate`) VALUES
	(85, 'Gold vile', NULL, 'Sarkandaugava', 'Small and in poor condo but good enough ig...', 17, '2026-02-11 08:52:56'),
	(86, 'asd', NULL, NULL, '', 17, NULL),
	(87, 'asdddd', NULL, NULL, '', 17, NULL),
	(88, 'roma', 'https://res.cloudinary.com/dj8lvgcxl/image/upload/v1770811965/apiaries/User:17_Apiary:88.jpg', NULL, '', 17, NULL),
	(89, 'dimon', 'https://res.cloudinary.com/dj8lvgcxl/image/upload/v1770812365/apiaries/User:17_Apiary:89.jpg', NULL, '', 17, NULL),
	(90, 'a', 'https://res.cloudinary.com/dj8lvgcxl/image/upload/v1770813666/apiaries/User:17_Apiary:90.png', NULL, '', 17, NULL),
	(91, 'qwe', NULL, NULL, 'qwe', 17, NULL),
	(92, 'Drava', 'https://res.cloudinary.com/dj8lvgcxl/image/upload/v1770916064/apiaries/User:17_Apiary:92.jpg', NULL, 's', 17, NULL);

-- Dumping structure for table honey_bee.hivehistory
CREATE TABLE IF NOT EXISTS `hivehistory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `text` varchar(200) DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  `hiveId` bigint DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_hivehistory_hives` (`hiveId`),
  KEY `FK_hivehistory_users` (`userId`),
  CONSTRAINT `FK_hivehistory_hives` FOREIGN KEY (`hiveId`) REFERENCES `hives` (`id`),
  CONSTRAINT `FK_hivehistory_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.hivehistory: ~2 rows (approximately)
INSERT INTO `hivehistory` (`id`, `text`, `userId`, `hiveId`, `creationDate`) VALUES
	(1, 'Created hive', 17, 70, '2026-02-12 18:03:38'),
	(2, 'Edited hive information', 17, 70, '2026-02-19 18:04:05');

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
  PRIMARY KEY (`id`),
  KEY `FK_hives_apiaries` (`apiaryId`) USING BTREE,
  KEY `FK_hive_user` (`userId`) USING BTREE,
  CONSTRAINT `FK_hives_apiaries` FOREIGN KEY (`apiaryId`) REFERENCES `apiaries` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_hives_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.hives: ~0 rows (approximately)
INSERT INTO `hives` (`id`, `name`, `image`, `location`, `type`, `description`, `apiaryId`, `userId`, `creationDate`) VALUES
	(59, 'qwe', NULL, NULL, 'Movable', 'qwe', 85, 17, '2026-02-12 17:16:04'),
	(60, 'qwewww', NULL, NULL, 'Stationary', 'wwww', 86, 17, '2026-02-12 17:16:04'),
	(61, 'qwewww', NULL, NULL, 'Stationary', 'wwww', 85, 17, '2026-02-12 17:16:05'),
	(62, 'qwewww', NULL, NULL, 'Stationary', 'wwww', 88, 17, '2026-02-12 17:16:05'),
	(63, 'qwewww', NULL, NULL, 'Stationary', 'wwww', 88, 17, '2026-02-12 17:16:06'),
	(64, 'qwewww', NULL, NULL, 'Stationary', 'wwww', 86, 17, '2026-02-12 17:16:06'),
	(65, 'qwewww', NULL, NULL, 'Stationary', 'wwww', 85, 17, '2026-02-12 17:16:07'),
	(66, 'qwe', NULL, NULL, 'Stationary', 'qwe', 85, 17, '2026-02-12 17:16:07'),
	(67, 'rt', NULL, NULL, 'Stationary', 'rt', 85, 17, '2026-02-12 17:16:07'),
	(68, 'ytu', NULL, NULL, 'Stationary', 'tyu', 85, 17, '2026-02-12 17:16:08'),
	(69, 'wwewq', NULL, NULL, 'Stationary', 'wwww', 85, 17, '2026-02-12 17:16:08'),
	(70, 'sigma box', 'https://res.cloudinary.com/dj8lvgcxl/image/upload/v1770896140/apiaries/User:17_Apiary:70.jpg', NULL, 'Movable', 'tru', 92, 17, '2026-02-12 17:16:09'),
	(71, 'ttt', NULL, NULL, 'Stationary', 't', 85, 17, '2026-02-12 17:16:10'),
	(72, 'yyy', NULL, NULL, 'Stationary', 'y', 85, 17, '2026-02-12 17:16:10');

-- Dumping structure for table honey_bee.notes
CREATE TABLE IF NOT EXISTS `notes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `creationDate` datetime DEFAULT NULL,
  `type` enum('WARNING','INFORMATIONAL') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `userId` bigint NOT NULL DEFAULT '0',
  `hiveId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_notes_users` (`userId`) USING BTREE,
  KEY `FK_notes_hives` (`hiveId`),
  CONSTRAINT `FK_notes_hives` FOREIGN KEY (`hiveId`) REFERENCES `hives` (`id`),
  CONSTRAINT `FK_notes_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.notes: ~3 rows (approximately)
INSERT INTO `notes` (`id`, `title`, `content`, `creationDate`, `type`, `userId`, `hiveId`) VALUES
	(3, ' Bees to reees ', '', '2026-02-11 16:48:55', 'WARNING', 17, 59),
	(4, ' Bees to reees ', 'One day i stumbled accross this beehive and hit it with my ball. Not safe to say that everything is not okey. After that masive hit all hive inhabitants started attacking ME!!! Didnt know that they\'re were going to be so pissed tf??!! Like chill out dude its not that serious. ', '2026-02-11 16:51:47', 'INFORMATIONAL', 17, 59),
	(5, 'sdf', 'sdf', '2026-02-11 17:03:30', 'WARNING', 17, 59),
	(6, 'super sigma', 'frrrr', '2026-02-12 11:46:41', 'WARNING', 17, 70),
	(7, 'suppa', 'ongada', '2026-02-12 12:51:24', 'WARNING', 17, 70),
	(8, 'wwww', 'wwww', '2026-02-12 17:08:14', 'INFORMATIONAL', 17, 70);

-- Dumping structure for table honey_bee.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `password` varchar(30) NOT NULL DEFAULT '',
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `role` enum('Admin','User') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'User',
  `provider` enum('GOOGLE') DEFAULT NULL,
  `providerSub` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.users: ~0 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `image`, `role`, `provider`, `providerSub`) VALUES
	(17, 'adryum', 'adiskir@gmail.com', '', 'https://lh3.googleusercontent.com/a/ACg8ocJBblyVyPH3vsLnjWs35nT73voyrwI0ZLZEKCXSpLaqJkxrhghA=s96-c', 'Admin', 'GOOGLE', '115394572813971691365');

-- Dumping structure for table honey_bee.whitelist
CREATE TABLE IF NOT EXISTS `whitelist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(60) DEFAULT NULL,
  `role` enum('ADMIN','WORKER') DEFAULT NULL,
  `status` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.whitelist: ~0 rows (approximately)
INSERT INTO `whitelist` (`id`, `email`, `role`, `status`) VALUES
	(1, 'adiskir@gmail.com', 'ADMIN', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
