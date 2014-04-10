/*
SQLyog Ultimate v11.33 (64 bit)
MySQL - 5.6.16 : Database - outgoing
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`outgoing` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `outgoing`;

/*Table structure for table `detail` */

DROP TABLE IF EXISTS `detail`;

CREATE TABLE `detail` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `nama_column` varchar(255) NOT NULL DEFAULT 'id',
  `head_id` varchar(255) NOT NULL,
  `primary_key` varchar(255) NOT NULL,
  `table_name` varchar(200) DEFAULT NULL,
  `data` text NOT NULL,
  `status` tinyint(2) DEFAULT '0',
  `hapus` tinyint(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`no`),
  KEY `head_id` (`head_id`),
  CONSTRAINT `detail_ibfk_1` FOREIGN KEY (`head_id`) REFERENCES `head` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;

/*Table structure for table `head` */

DROP TABLE IF EXISTS `head`;

CREATE TABLE `head` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `tujuan` int(11) NOT NULL,
  `id_cabang` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=384 DEFAULT CHARSET=latin1;

/* Trigger structure for table `head` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `kolum_id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `kolum_id` BEFORE INSERT ON `head` FOR EACH ROW BEGIN
	IF (NEW.id = '' ) then
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='head'),'.',New.id_cabang);
	END IF;
    END */$$


DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
