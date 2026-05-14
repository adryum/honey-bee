-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               9.7.0 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.17.0.7270
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table honey_bee.apiaries: ~3 rows (approximately)
INSERT INTO `apiaries` (`id`, `name`, `image_url`, `location`, `description`, `user_id_creator`, `creation_timestamp`) VALUES
	(118, 'ApiaryNR1', NULL, NULL, 'ddescription text', NULL, '2026-05-01 19:59:03'),
	(119, 'xxxx', NULL, NULL, 'xxxx', NULL, '2026-05-01 20:02:48'),
	(120, 'Really?', 'https://res.cloudinary.com/dj8lvgcxl/image/upload/v1778091073/apiaries/User:27_Apiary:120.png', NULL, 'its a question\r\n', NULL, '2026-05-06 18:11:10');

-- Dumping data for table honey_bee.apiary_action_history: ~2 rows (approximately)
INSERT INTO `apiary_action_history` (`id`, `text`, `user_id`, `history_action_type_id`, `apiary_id`, `creation_timestamp`) VALUES
	(111, 'Created apiary', NULL, 7, 119, '2026-05-01 20:02:48'),
	(112, 'Created apiary', NULL, 7, 120, '2026-05-06 18:11:12');

-- Dumping data for table honey_bee.history_action_types: ~4 rows (approximately)
INSERT INTO `history_action_types` (`id`, `type`) VALUES
	(6, 'CALENDAR'),
	(7, 'EDIT'),
	(8, 'NOTE'),
	(9, 'INSPECTION'),
	(10, 'QUEEN');

-- Dumping data for table honey_bee.hive_action_history: ~0 rows (approximately)

-- Dumping data for table honey_bee.hive_honey_yield: ~9 rows (approximately)
INSERT INTO `hive_honey_yield` (`id`, `amount`, `hive_id`, `inspection_id`, `creation_timestamp`) VALUES
	(18, 20, 95, 112, '2026-05-04 16:20:47'),
	(19, 99.96, 95, 113, '2026-05-04 16:21:47'),
	(20, 200, 95, 114, '2026-05-04 16:23:11'),
	(21, 20, 95, 115, '2026-05-04 16:39:10'),
	(22, 80, 96, 115, '2026-05-04 16:39:10'),
	(23, 37.5, 95, 116, '2026-05-04 16:39:56'),
	(24, 62.5, 96, 116, '2026-05-04 16:39:56'),
	(25, 0, 95, 117, '2026-05-04 16:42:57'),
	(26, 200.01, 96, 117, '2026-05-04 16:42:57'),
	(27, 9999.99, 95, 120, '2026-05-04 18:31:59'),
	(28, 0, 96, 120, '2026-05-04 18:31:59'),
	(29, 6, 98, 124, '2026-05-08 11:13:18');

-- Dumping data for table honey_bee.hive_inspection_forms: ~19 rows (approximately)
INSERT INTO `hive_inspection_forms` (`id`, `abnormal_behavior`, `abnormal_behavior_description`, `swarming`, `need_feeding`, `queen_alive`, `queen_laying_eggs`, `queen_laying_eggs_incorrectly`, `need_more_honey_frames`, `need_more_honey_frames_amount`, `need_more_breeding_frames`, `need_more_breeding_frames_amount`, `need_medical_attention`, `need_medical_attention_description`, `has_hive_damage`, `has_hive_damage_description`, `taking_frames`, `taken_honey_frames`, `taken_breeding_frames`, `inspection_id`, `hive_id`) VALUES
	(198, 1, '', 0, 1, 1, 0, 0, 1, 4, 1, 21314232, 1, '', 0, '', 1, 4, -4, 112, 95),
	(199, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 12, 0, 113, 95),
	(200, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 2, 0, 114, 95),
	(201, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 1, 0, 115, 95),
	(202, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 4, 0, 115, 96),
	(203, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 3, 0, 116, 95),
	(204, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 5, 0, 116, 96),
	(205, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 0, 0, 117, 95),
	(206, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 3, 0, 117, 96),
	(207, 1, 'aooolelle', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 2, 0, 118, 95),
	(208, 0, '', 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 'asdasd', 0, '', 1, 0, 4, 118, 96),
	(209, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 4, 0, 119, 95),
	(210, 1, 'eat', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 0, 0, 0, 119, 96),
	(211, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 3, 0, 120, 95),
	(212, 1, 'eaTTTTT', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 0, 0, 0, 120, 96),
	(213, 0, '', 0, 0, 0, 0, 0, 0, 0, 1, -22, 0, '', 0, '', 1, -1, 20, 121, 95),
	(214, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 0, 0, 0, 121, 96),
	(215, 1, '', 1, 0, 1, 1, 1, 1, 2, 0, 0, 0, '', 0, '', 0, 0, 0, 122, 95),
	(216, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 0, 0, 0, 122, 96),
	(217, 0, '', 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, '', 0, '', 0, 0, 0, 123, 95),
	(218, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 0, 0, 0, 123, 96),
	(219, 0, '', 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 1, 4, 0, 124, 98);

-- Dumping data for table honey_bee.hive_notes: ~1 rows (approximately)
INSERT INTO `hive_notes` (`id`, `title`, `content`, `type`, `user_id`, `hive_id`, `creation_timestamp`) VALUES
	(52, 'new note', 'bees sting!', 'WARNING', NULL, 96, NULL);

-- Dumping data for table honey_bee.hive_queen_history: ~11 rows (approximately)
INSERT INTO `hive_queen_history` (`id`, `time_spent_in_hive`, `image_url`, `queen_species_id`, `hive_id`, `placed_here_timestamp`, `creation_timestamp`) VALUES
	(1, '0 years, 0 months, 0 days', NULL, 2, 96, '2026-05-13 08:48:35', '2026-05-13 12:46:35'),
	(2, '0 years, 0 months, 0 days', NULL, 2, 96, '2026-05-13 09:12:35', '2026-05-13 12:46:36'),
	(3, '0 years, 0 months, 0 days', NULL, 2, 96, '2026-05-13 12:13:08', '2026-05-13 12:46:37'),
	(4, '0 years, 0 months, 0 days', NULL, 2, 96, '2026-05-13 12:13:24', '2026-05-13 12:46:39'),
	(5, '0 years, 0 months, 0 days', NULL, 2, 96, '2026-05-13 09:14:52', '2026-05-13 12:46:40'),
	(6, '0 years, 0 months, 0 days', 'https://res.cloudinary.com/dj8lvgcxl/image/upload/v1778674583/apiaries/User:27_Apiary:18.png', 2, 96, '2026-05-13 09:16:19', '2026-05-13 12:46:41'),
	(7, '0 years, 0 months, 0 days', 'https://res.cloudinary.com/dj8lvgcxl/image/upload/v1778674699/apiaries/User:27_Apiary:19.png', 2, 96, '2026-05-13 12:18:15', '2026-05-13 12:46:42'),
	(8, '0 years, 0 months, 0 days', 'https://res.cloudinary.com/dj8lvgcxl/image/upload/v1778674719/apiaries/User:27_Apiary:20.png', 2, 96, '2026-05-13 09:18:37', '2026-05-13 12:46:44'),
	(9, '0 years, 0 months, 0 days', NULL, 2, 95, '2026-05-13 10:11:16', '2026-05-13 13:11:19'),
	(10, '0 years, 0 months, 0 days', NULL, 2, 95, '2026-05-13 10:13:07', '2026-05-13 13:13:10'),
	(11, '0 years, 0 months, 0 days', NULL, 2, 95, '2026-05-13 10:13:27', '2026-05-13 13:13:29'),
	(12, '0 years, 0 months, 0 days', NULL, 2, 95, '2026-05-13 10:14:53', '2026-05-13 13:14:55');

-- Dumping data for table honey_bee.hives: ~4 rows (approximately)
INSERT INTO `hives` (`id`, `name`, `image_url`, `location`, `type`, `description`, `apiary_id`, `user_id`, `creation_timestamp`, `calendar_id`) VALUES
	(95, 'xxxx', NULL, NULL, 'Movable', 'xxxx', 119, NULL, '2026-05-01 20:03:01', '5961867de3d2fc799b45d07be1d26370fd82cc5ed233fff9c871656b3093794c@group.calendar.google.com'),
	(96, 'Apple ', 'https://res.cloudinary.com/dj8lvgcxl/image/upload/v1777912714/apiaries/User:27_Apiary:96.png', NULL, 'Movable', 'hive with apples!', 119, NULL, '2026-05-04 16:38:31', 'd53fa75fdc7ba3edfaa7f3389ad9d4ffcce8365850e40bf416e4594e49635aca@group.calendar.google.com'),
	(97, 'HIV', NULL, NULL, 'Movable', 'HIve1', 118, NULL, '2026-05-05 12:45:55', '4e7c51e4ef6610846df74a148ffcbd90c38a35efb44e7f0845a6ee6af02b9ecc@group.calendar.google.com'),
	(98, 'adama stropins', NULL, NULL, 'Movable', 'jjj', 120, NULL, '2026-05-08 11:12:09', '384c791435ccdfe6e75d22ca021697c051ac6b121c8792c710368a9fdb42d01f@group.calendar.google.com');

-- Dumping data for table honey_bee.inspections: ~13 rows (approximately)
INSERT INTO `inspections` (`id`, `processed`, `apiary_id`, `user_id_creator`, `creation_timestamp`) VALUES
	(112, 1, 119, NULL, '2026-05-04 16:19:49'),
	(113, 1, 119, NULL, '2026-05-04 16:21:41'),
	(114, 1, 119, NULL, '2026-05-04 16:23:03'),
	(115, 1, 119, NULL, '2026-05-04 16:39:03'),
	(116, 1, 119, NULL, '2026-05-04 16:39:50'),
	(117, 1, 119, NULL, '2026-05-04 16:42:51'),
	(118, 1, 119, NULL, '2026-05-04 17:31:29'),
	(119, 1, 119, NULL, '2026-05-04 18:22:27'),
	(120, 1, 119, NULL, '2026-05-04 18:31:50'),
	(121, 0, 119, NULL, '2026-05-06 16:56:44'),
	(122, 0, 119, NULL, '2026-05-06 17:17:57'),
	(123, 0, 119, NULL, '2026-05-06 17:24:50'),
	(124, 1, 120, NULL, '2026-05-08 11:13:11');

-- Dumping data for table honey_bee.queen_species: ~0 rows (approximately)
INSERT INTO `queen_species` (`id`, `known_as_name`, `scientific_name`, `life_expectancy`, `description`, `behavior`, `preferences`) VALUES
	(2, 'bigus\r\n', 'bitusus', '2 years', 'eats a lot', 'angry', 'like to sleep');

-- Dumping data for table honey_bee.queens: ~3 rows (approximately)
INSERT INTO `queens` (`id`, `image_url`, `born_date`, `added_to_hive_timestamp`, `queen_species_id`, `hive_id`) VALUES
	(9, NULL, '1111-11-11 00:00:00', '2026-05-13 11:48:01', 2, 97),
	(21, NULL, '0322-12-21 22:09:44', '2026-05-13 12:53:33', 2, 96);

-- Dumping data for table honey_bee.user_apiary_access: ~0 rows (approximately)

-- Dumping data for table honey_bee.user_hive_access: ~0 rows (approximately)

-- Dumping data for table honey_bee.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `image_url`, `role`, `provider`, `provider_sub`, `google_refresh_token`) VALUES
	(28, 'adryum', 'adiskir@gmail.com', NULL, 'ADMINISTRATOR', 'GOOGLE', '115394572813971691365', '');

-- Dumping data for table honey_bee.whitelist: ~2 rows (approximately)
INSERT INTO `whitelist` (`id`, `email`, `role`, `status`, `user_id`) VALUES
	(32, 'adiskir@gmail.com', 'ADMINISTRATOR', 1, 28),
	(33, 'nnlknlklnk', 'MANAGEMENT', 1, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
