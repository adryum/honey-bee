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
  `image` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_apiary_user` (`user_id`) USING BTREE,
  CONSTRAINT `FK_apiaries_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.apiaries: ~1 rows (approximately)
INSERT INTO `apiaries` (`id`, `name`, `image`, `location`, `description`, `user_id`) VALUES
	(37, 'Dreiliņi', 'apiary.jpg', 'asd', 'dsa', 2),
	(45, 'asda', 'apiary1.jpg', 'asdasdadadasdasd', '', 2),
	(54, 'Dimants', NULL, 'Rīga', '', 2);

-- Dumping structure for table honey_bee.calendar_entry
CREATE TABLE IF NOT EXISTS `calendar_entry` (
  `id` int NOT NULL,
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `calendar_date` date DEFAULT NULL,
  `type` enum('cikliska','obligāta','parasta') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `author` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_calendar_entry_user` (`author`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.calendar_entry: ~0 rows (approximately)
INSERT INTO `calendar_entry` (`id`, `title`, `content`, `creation_date`, `calendar_date`, `type`, `author`) VALUES
	(1, 'Pārbaudīt pret blusām', NULL, '2025-05-18', '2025-06-18', 'obligāta', '#2');

-- Dumping structure for table honey_bee.calendar_entry__apiary
CREATE TABLE IF NOT EXISTS `calendar_entry__apiary` (
  `id` int NOT NULL,
  `entry` int DEFAULT NULL,
  `apiary` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_calendar_entry__apiary_calendar_entry` (`entry`),
  KEY `FK_calendar_entry__apiary_apiary` (`apiary`),
  CONSTRAINT `FK_calendar_entry__apiary_calendar_entry` FOREIGN KEY (`entry`) REFERENCES `calendar_entry` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.calendar_entry__apiary: ~0 rows (approximately)

-- Dumping structure for table honey_bee.calendar_entry__hive
CREATE TABLE IF NOT EXISTS `calendar_entry__hive` (
  `id` int NOT NULL,
  `entry` int NOT NULL,
  `hive` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_calendar_entry__hive_calendar_entry` (`entry`),
  KEY `FK_calendar_entry__hive_hive` (`hive`),
  CONSTRAINT `FK_calendar_entry__hive_calendar_entry` FOREIGN KEY (`entry`) REFERENCES `calendar_entry` (`id`),
  CONSTRAINT `FK_calendar_entry__hive_hive` FOREIGN KEY (`hive`) REFERENCES `hives` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.calendar_entry__hive: ~0 rows (approximately)

-- Dumping structure for table honey_bee.calendar_entry__inventory
CREATE TABLE IF NOT EXISTS `calendar_entry__inventory` (
  `id` int NOT NULL,
  `entry` int DEFAULT NULL,
  `item` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_calendar_entry__inventory_calendar_entry` (`entry`),
  KEY `FK_calendar_entry__inventory_inventory` (`item`),
  CONSTRAINT `FK_calendar_entry__inventory_calendar_entry` FOREIGN KEY (`entry`) REFERENCES `calendar_entry` (`id`),
  CONSTRAINT `FK_calendar_entry__inventory_inventory` FOREIGN KEY (`item`) REFERENCES `inventory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.calendar_entry__inventory: ~0 rows (approximately)

-- Dumping structure for table honey_bee.calendar_entry__queen_bee
CREATE TABLE IF NOT EXISTS `calendar_entry__queen_bee` (
  `id` int NOT NULL,
  `entry` int DEFAULT NULL,
  `bee` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_calendar_entry__queen_bee_calendar_entry` (`entry`),
  KEY `FK_calendar_entry__queen_bee_queen_bee` (`bee`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.calendar_entry__queen_bee: ~0 rows (approximately)

-- Dumping structure for table honey_bee.hives
CREATE TABLE IF NOT EXISTS `hives` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `type` enum('Stationary','Movable','Tower') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `frames` int DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `queen_bee_id` bigint DEFAULT NULL,
  `apiary_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_hives_apiaries` (`apiary_id`) USING BTREE,
  KEY `FK_hive_queen_bee` (`queen_bee_id`) USING BTREE,
  KEY `FK_hive_user` (`user_id`) USING BTREE,
  CONSTRAINT `FK_hives_apiaries` FOREIGN KEY (`apiary_id`) REFERENCES `apiaries` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_hives_queen_bee` FOREIGN KEY (`queen_bee_id`) REFERENCES `queen_bees` (`id`),
  CONSTRAINT `FK_hives_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.hives: ~10 rows (approximately)
INSERT INTO `hives` (`id`, `name`, `image`, `location`, `type`, `weight`, `frames`, `description`, `queen_bee_id`, `apiary_id`, `user_id`) VALUES
	(1, 'Box', 'Hive1.jpg', NULL, 'Movable', 23, 1, NULL, 2, NULL, 2),
	(2, 'Box2', 'Hive3.jpg', NULL, 'Tower', 234.6, 8, NULL, 1, NULL, 2),
	(3, 'Bisumaja', 'Hive2.jpeg', NULL, 'Movable', 23, 1, NULL, 1, 37, 2),
	(4, 'Klucis', 'Hive4.webp', NULL, 'Movable', 1, 2, NULL, 1, 37, 2),
	(5, 'kartonas', 'Hive5.webp', NULL, 'Tower', 2, 3, NULL, NULL, NULL, 2),
	(6, 'asdasda', 'Hive6.jpg', NULL, 'Movable', 34, NULL, NULL, NULL, NULL, 2),
	(7, 'ageyusfsdgu', 'Hive7.jpeg', NULL, 'Movable', NULL, NULL, NULL, NULL, 37, 2),
	(30, 'Halva', '', 'Rīga', 'Stationary', NULL, NULL, 'Liela māja kokā', NULL, NULL, 2);

-- Dumping structure for table honey_bee.inventory
CREATE TABLE IF NOT EXISTS `inventory` (
  `id` int NOT NULL,
  `registrator` varchar(20) NOT NULL DEFAULT '',
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `image` blob,
  `registration_date` date DEFAULT NULL,
  `assigned_location` int DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__user` (`registrator`),
  KEY `FK_inventory_inventory_location` (`assigned_location`) USING BTREE,
  CONSTRAINT `FK_inventory_inventory_location` FOREIGN KEY (`assigned_location`) REFERENCES `inventory_location` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.inventory: ~2 rows (approximately)
INSERT INTO `inventory` (`id`, `registrator`, `name`, `description`, `image`, `registration_date`, `assigned_location`, `price`) VALUES
	(1, '#2', 'Kostīms', 'Balts, drusku nolietots', NULL, '2025-05-18', NULL, 300),
	(2, '#1', 'Dūmu veidotājs', 'Pelēks, mierina bites', NULL, '2025-05-18', NULL, 250.23);

-- Dumping structure for table honey_bee.inventory_location
CREATE TABLE IF NOT EXISTS `inventory_location` (
  `id` int NOT NULL,
  `apiary` int DEFAULT NULL,
  `hive` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__apiary` (`apiary`),
  KEY `FK__hive` (`hive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.inventory_location: ~4 rows (approximately)
INSERT INTO `inventory_location` (`id`, `apiary`, `hive`) VALUES
	(1, NULL, 1),
	(2, 7, NULL),
	(3, 5, NULL),
	(4, NULL, 7);

-- Dumping structure for table honey_bee.notes
CREATE TABLE IF NOT EXISTS `notes` (
  `id` bigint NOT NULL DEFAULT (0),
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `color` varchar(6) DEFAULT NULL,
  `user_id` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_notes_users` (`user_id`),
  CONSTRAINT `FK_notes_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.notes: ~2 rows (approximately)
INSERT INTO `notes` (`id`, `title`, `content`, `creation_date`, `color`, `user_id`) VALUES
	(0, 'Apēst Medu', 'Ar lielu karoti ātri jāēd no stropa augšās, lai bites nepaspētu apjēgties, kas notiek!', '2025-06-11', 'FF1234', 2),
	(2, 'Pabarot bites', 'Paņemt cukuru un pabarot stropus', '2025-06-09', 'FF1236', 2);

-- Dumping structure for table honey_bee.note_place
CREATE TABLE IF NOT EXISTS `note_place` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `note_id` bigint DEFAULT NULL,
  `queen_bee` int DEFAULT NULL,
  `hive` bigint DEFAULT NULL,
  `apiary` int DEFAULT NULL,
  `inventory` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__queen_bee` (`queen_bee`),
  KEY `FK__apiary1` (`apiary`),
  KEY `FK__inventory` (`inventory`),
  KEY `FK_note_place_hives` (`hive`),
  KEY `FK_note_place_note` (`note_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.note_place: ~2 rows (approximately)
INSERT INTO `note_place` (`id`, `note_id`, `queen_bee`, `hive`, `apiary`, `inventory`) VALUES
	(1, NULL, NULL, NULL, NULL, 1),
	(2, NULL, 2, NULL, NULL, NULL);

-- Dumping structure for table honey_bee.note_place__hive
CREATE TABLE IF NOT EXISTS `note_place__hive` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `note_id` bigint DEFAULT '0',
  `hive_id` bigint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_note_place__hive_hives` (`hive_id`),
  KEY `FK_note_place__hive_notes` (`note_id`),
  CONSTRAINT `FK_note_place__hive_hives` FOREIGN KEY (`hive_id`) REFERENCES `hives` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_note_place__hive_notes` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.note_place__hive: ~2 rows (approximately)
INSERT INTO `note_place__hive` (`id`, `note_id`, `hive_id`) VALUES
	(3, 2, 4),
	(4, 0, 4);

-- Dumping structure for table honey_bee.queen_bees
CREATE TABLE IF NOT EXISTS `queen_bees` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `specie_id` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_queen_bee_queen_bee_species` (`specie_id`) USING BTREE,
  KEY `FK_queen_bees_users` (`user_id`),
  CONSTRAINT `FK_queen_bees_queen_bee_species` FOREIGN KEY (`specie_id`) REFERENCES `queen_bee_species` (`id`),
  CONSTRAINT `FK_queen_bees_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.queen_bees: ~2 rows (approximately)
INSERT INTO `queen_bees` (`id`, `name`, `image`, `registration_date`, `specie_id`, `user_id`) VALUES
	(1, 'Daisy', 'queen1.jpg', '2025-05-13', 1, 2),
	(2, 'Olga', NULL, '2025-05-18', 2, 2);

-- Dumping structure for table honey_bee.queen_bee_species
CREATE TABLE IF NOT EXISTS `queen_bee_species` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_latin` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(500) NOT NULL,
  `image` blob,
  `life_span_years` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.queen_bee_species: ~2 rows (approximately)
INSERT INTO `queen_bee_species` (`id`, `name_latin`, `description`, `image`, `life_span_years`) VALUES
	(1, 'Bigus bitus', 'Very big bee', NULL, 100),
	(2, 'Western honey bee', 'Like all honey bee species, the western honey bee is eusocial, creating colonies with a single fertile female (or "queen"), many normally non-reproductive females or "workers", and a small proportion of fertile males or "drones". Individual colonies can house tens of thousands of bees. Colony activities are organized by complex communication between individuals, through both pheromones and the waggle dance.', NULL, 2);

-- Dumping structure for table honey_bee.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `surname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `profile_picture` blob,
  `e_mail` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(30) NOT NULL DEFAULT '',
  `role` enum('Admin','Worker','Free User','Paid User') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table honey_bee.users: ~7 rows (approximately)
INSERT INTO `users` (`id`, `account_code`, `name`, `surname`, `profile_picture`, `e_mail`, `password`, `role`, `username`) VALUES
	(2, '#2', 'Time', 'Lielas', NULL, 'admin@gmail.com', 'Admin1', 'Admin', 'Pica');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
