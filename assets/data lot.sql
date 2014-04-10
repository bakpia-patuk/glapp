/*
SQLyog Ultimate v11.33 (64 bit)
MySQL - 5.6.16 : Database - glapp_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `trx_stock`;

CREATE TABLE `trx_stock` (
  `no` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id` varchar(100) NOT NULL,
  `stk_date` datetime NOT NULL,
  `stk_cabangid` int(11) NOT NULL,
  `stk_divisiid` int(11) NOT NULL,
  `stk_ruangid` int(11) NOT NULL,
  `stk_usercreate` int(11) NOT NULL,
  `stk_trxtype` int(11) NOT NULL,
  `stk_trxreftype` varchar(50) NOT NULL,
  `stk_trxref` varchar(200) NOT NULL,
  `stk_barangid` varchar(100) NOT NULL,
  `stk_qty` int(11) NOT NULL,
  `stk_qtylast` int(11) NOT NULL,
  `simpan_status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Table structure for table `trx_stock_lot` */

DROP TABLE IF EXISTS `trx_stock_lot`;

CREATE TABLE `trx_stock_lot` (
  `no` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id` varchar(100) NOT NULL,
  `stl_date` datetime NOT NULL,
  `stl_cabangid` int(11) NOT NULL,
  `stl_divisiid` int(11) NOT NULL,
  `stl_ruangid` int(11) NOT NULL,
  `stl_usercreate` int(11) NOT NULL,
  `stl_barangid` varchar(100) NOT NULL,
  `stl_nolot` varchar(100) NOT NULL,
  `stl_qty` int(11) NOT NULL,
  `stl_qtylast` int(11) NOT NULL,
  `stl_baranged` date NOT NULL,
  `stk_trxreftype` varchar(50) NOT NULL,
  `stk_trxref` varchar(100) NOT NULL,
  `stl_barcode` varchar(200) NOT NULL,
  `simpan_status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Table structure for table `trx_stock_lotdiv` */

DROP TABLE IF EXISTS `trx_stock_lotdiv`;

CREATE TABLE `trx_stock_lotdiv` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(100) NOT NULL,
  `stl_nolot` varchar(100) NOT NULL,
  `stl_cabangid` int(11) NOT NULL,
  `stl_barangqty` int(11) NOT NULL,
  `stl_baranged` date NOT NULL,
  `stl_barcode` varchar(200) NOT NULL,
  `simpan_status` tinyint(4) NOT NULL,
  `stl_ruang_id` int(11) NOT NULL,
  `stl_barangid` varchar(100) NOT NULL,
  `trx_ref` varchar(20) NOT NULL,
  `stl_ttid` int(11) NOT NULL,
  `stl_poid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `no` (`no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `trx_stok_div` */

DROP TABLE IF EXISTS `trx_stok_div`;

CREATE TABLE `trx_stok_div` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(100) NOT NULL,
  `id_ruang` int(11) NOT NULL,
  `id_cabang` int(11) NOT NULL,
  `id_barang` varchar(100) NOT NULL,
  `jmlh_stok` int(11) NOT NULL,
  `jenis_trx` int(11) NOT NULL,
  `trx_stok` varchar(100) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `simpan_status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/* Trigger structure for table `detail_kas_bon` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `detail kas bon id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `detail kas bon id` BEFORE INSERT ON `detail_kas_bon` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='detail_kas_bon'),'.',New.cabang_id);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `kas_anggaran_faktur` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `kas_anggaran_faktur` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `kas_anggaran_faktur` BEFORE INSERT ON `kas_anggaran_faktur` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='kas_anggaran_faktur'),'.',New.cabang_id);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `kas_minta_anggaran` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `kas_minta_anggaran_id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `kas_minta_anggaran_id` BEFORE INSERT ON `kas_minta_anggaran` FOR EACH ROW BEGIN
  IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='kas_minta_anggaran'),'.',New.cabang_id);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `ms_telisa` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `ms_telisa_triger` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `ms_telisa_triger` BEFORE INSERT ON `ms_telisa` FOR EACH ROW BEGIN
	IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='ms_telisa'),'.',New.mt_cabang);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `pengadaan_detail` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `pengadaan detail id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `pengadaan detail id` BEFORE INSERT ON `pengadaan_detail` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='pengadaan_detail'),'.',New.cabang_id);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_agrplan` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx agrplan id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx agrplan id` BEFORE INSERT ON `trx_agrplan` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_agrplan'),'.',New.trx_cabangid);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_agrplan_detail` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx agr plan detail id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx agr plan detail id` BEFORE INSERT ON `trx_agrplan_detail` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_agrplan_detail'),'.',New.agrplan_cabang);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_faktur` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx_faktur_id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx_faktur_id` BEFORE INSERT ON `trx_faktur` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_faktur'),'.',New.faktur_cabang);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_faktur_bayar` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx_faktur_bayar` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx_faktur_bayar` BEFORE INSERT ON `trx_faktur_bayar` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_faktur_bayar'),'.',New.faktur_cabang);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_faktur_detail` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx_faktur_detail` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx_faktur_detail` BEFORE INSERT ON `trx_faktur_detail` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_faktur_detail'),'.',New.trx_usercabang);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_pengadaan` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx pengadaan id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx pengadaan id` BEFORE INSERT ON `trx_pengadaan` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_pengadaan'),'.',New.petugas_id);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_pengadaan_detail` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx pengadaan detail id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx pengadaan detail id` BEFORE INSERT ON `trx_pengadaan_detail` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_pengadaan_detail'),'.',New.cabang_id);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_pengdivisi` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx pengdivisi id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx pengdivisi id` BEFORE INSERT ON `trx_pengdivisi` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_pengdivisi'),'.',New.pengdiv_cabang);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_pengdivisi_detail` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx pengdivisi detail id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx pengdivisi detail id` BEFORE INSERT ON `trx_pengdivisi_detail` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_pengdivisi_detail'),'.',New.cabang_id);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_po` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx po id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx po id` BEFORE INSERT ON `trx_po` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_po'),'.',New.po_cabangid);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_po_detail` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx po detail id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx po detail id` BEFORE INSERT ON `trx_po_detail` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_po_detail'),'.',New.po_cabang_id);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_stock` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx stock id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx stock id` BEFORE INSERT ON `trx_stock` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_stock'),'.',New.stk_cabangid);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_stock_lot` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx stok lot id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx stok lot id` BEFORE INSERT ON `trx_stock_lot` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_stock_lot'),'.',New.stl_cabangid);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_stock_lotdiv` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx stok lot div id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx stok lot div id` BEFORE INSERT ON `trx_stock_lotdiv` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_stock_lotdiv'),'.',New.stl_cabangid);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_stok_div` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx stok div id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx stok div id` BEFORE INSERT ON `trx_stok_div` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_stok_div'),'.',New.id_cabang);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_tt` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx_tt_id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx_tt_id` BEFORE INSERT ON `trx_tt` FOR EACH ROW BEGIN
  IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_tt'),'.',New.tt_cabang);
	END IF;
    END */$$


DELIMITER ;

/* Trigger structure for table `trx_tt_detail` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `trx_tt_detail_id` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `trx_tt_detail_id` BEFORE INSERT ON `trx_tt_detail` FOR EACH ROW BEGIN
IF (NEW.id = '' ) THEN
		SET New.id = CONCAT((SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='trx_tt_detail'),'.',New.tt_cabang_id);
	END IF;
    END */$$


DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
