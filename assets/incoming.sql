/*
SQLyog Ultimate v11.33 (64 bit)
MySQL - 5.6.16 : Database - incoming
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`incoming` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `incoming`;

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
  `hapus` tinyint(2) DEFAULT '0',
  PRIMARY KEY (`no`),
  KEY `head_id` (`head_id`),
  CONSTRAINT `detail_ibfk_1` FOREIGN KEY (`head_id`) REFERENCES `head` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;

/*Table structure for table `head` */

DROP TABLE IF EXISTS `head`;

CREATE TABLE `head` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `dari` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
