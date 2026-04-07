-- MySQL dump 10.13  Distrib 9.5.0, for macos26.0 (arm64)
--
-- Host: localhost    Database: honey_bee
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '11852daa-b9ae-11f0-bfb0-168a74a5dd66:1-2621';

--
-- Table structure for table `apiaries`
--

CREATE DATABASE IF NOT EXISTS `honey_bee` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `honey_bee`;

DROP TABLE IF EXISTS `apiaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apiaries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `location` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_apiary_user` (`userId`) USING BTREE,
  CONSTRAINT `FK_apiaries_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hive_honey_production`
--

DROP TABLE IF EXISTS `hive_honey_production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hive_honey_production` (
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hive_inspection_forms`
--

DROP TABLE IF EXISTS `hive_inspection_forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hive_inspection_forms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isAbnormalBehavior` tinyint(1) NOT NULL,
  `abnormalBehaviorDescription` varchar(500) DEFAULT NULL,
  `isSwarming` tinyint(1) NOT NULL,
  `needFeeding` tinyint(1) NOT NULL,
  `isQueenAlive` tinyint(1) NOT NULL,
  `isQueenLayingEggs` tinyint(1) NOT NULL,
  `isQueenLayingEggsIncorrectly` tinyint(1) NOT NULL,
  `needMoreHoneyFrames` tinyint(1) NOT NULL,
  `needMoreHoneyFramesAmount` int DEFAULT NULL,
  `needMoreBreedingFrames` tinyint(1) NOT NULL,
  `needMoreBreedingFramesAmount` int DEFAULT NULL,
  `needMedicalAttention` tinyint(1) NOT NULL,
  `medicalAttentionDescription` varchar(500) DEFAULT NULL,
  `hasHiveDamage` tinyint(1) NOT NULL,
  `hiveDamageDescription` varchar(500) DEFAULT NULL,
  `isTakingFrames` tinyint(1) NOT NULL,
  `takenHoneyFrames` int DEFAULT NULL,
  `takenBreedingFrames` int DEFAULT NULL,
  `inspectionId` bigint NOT NULL,
  `hiveId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inpsectionId_idx` (`inspectionId`),
  KEY `hiveId_idx` (`hiveId`),
  CONSTRAINT `hiveId` FOREIGN KEY (`hiveId`) REFERENCES `hives` (`id`) ON DELETE SET NULL,
  CONSTRAINT `inpsectionId` FOREIGN KEY (`inspectionId`) REFERENCES `hive_inspections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hive_inspections`
--

DROP TABLE IF EXISTS `hive_inspections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hive_inspections` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `apiaryId` bigint DEFAULT NULL,
  `userIdCreator` bigint DEFAULT NULL,
  `processed` tinyint(1) NOT NULL DEFAULT '0',
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userIdCreator`),
  KEY `apiaryId_idx` (`apiaryId`),
  CONSTRAINT `apiaryId` FOREIGN KEY (`apiaryId`) REFERENCES `apiaries` (`id`) ON DELETE SET NULL,
  CONSTRAINT `userId` FOREIGN KEY (`userIdCreator`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hivehistory`
--

DROP TABLE IF EXISTS `hivehistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hivehistory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `text` varchar(200) DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  `hiveId` bigint DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT NULL,
  `type` enum('CALENDAR','EDIT','NOTE','INSPECTION') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_hivehistory_users` (`userId`),
  KEY `FK_hivehistory_hives` (`hiveId`),
  CONSTRAINT `FK_hivehistory_hives` FOREIGN KEY (`hiveId`) REFERENCES `hives` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_hivehistory_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hives`
--

DROP TABLE IF EXISTS `hives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hives` (
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
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userapiaryaccess`
--

DROP TABLE IF EXISTS `userapiaryaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userapiaryaccess` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userId` bigint DEFAULT NULL,
  `apiaryId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__apiaries` (`apiaryId`),
  KEY `FK__users` (`userId`),
  CONSTRAINT `FK__apiaries` FOREIGN KEY (`apiaryId`) REFERENCES `apiaries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK__users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userhiveaccess`
--

DROP TABLE IF EXISTS `userhiveaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userhiveaccess` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userId` bigint NOT NULL DEFAULT '0',
  `hiveId` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_userhiveaccess_hives` (`hiveId`),
  KEY `FK_userhiveaccess_users` (`userId`),
  CONSTRAINT `FK_userhiveaccess_hives` FOREIGN KEY (`hiveId`) REFERENCES `hives` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_userhiveaccess_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `password` varchar(30) NOT NULL DEFAULT '',
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `role` enum('ADMINISTRATOR','APIARY_MAINTAINER','MANAGEMENT','HIVE_WORKER') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `provider` enum('GOOGLE') DEFAULT NULL,
  `providerSub` varchar(255) DEFAULT NULL,
  `googleRefreshToken` text,
  `isWhitelisted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `whitelist`
--

DROP TABLE IF EXISTS `whitelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `whitelist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(60) DEFAULT NULL,
  `role` enum('ADMINISTRATOR','APIARY_MAINTAINER','MANAGEMENT','HIVE_WORKER') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-07 11:51:05
