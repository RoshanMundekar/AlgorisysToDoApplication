/*
SQLyog Community Edition- MySQL GUI v7.01 
MySQL - 5.0.27-community-nt : Database - todoer
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`todoer` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `todoer`;

/*Table structure for table `register` */

DROP TABLE IF EXISTS `register`;

CREATE TABLE `register` (
  `ID` int(255) NOT NULL auto_increment,
  `Username` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `password` varchar(255) default NULL,
  `password_hash` varchar(255) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `register` */

insert  into `register`(`ID`,`Username`,`email`,`password`,`password_hash`) values (1,'amol','mundekarroshan566@gmail.com','amol','scrypt:32768:8:1$l7twriAkqZM3DBuz$01772d8b15438b44d12074a5b32d3cf8cd45210f51be718d47398db98657c3f1d3a11e48152f1fecdf76d1ff59096936fccb1053fd4f6a14f4cff9928e860ba2'),(2,'sahil','rmundekar200@gmail.com','sahil','scrypt:32768:8:1$RzV2EtMbg5yAWmww$7f408e3510598fa84404118f12f0edc653d5a0074aaa4d4432949a9dd616575f560ebe36df7cec417de059e12f37c3b483cc920b08d199dd1ee992142d4374e0');

/*Table structure for table `subtask` */

DROP TABLE IF EXISTS `subtask`;

CREATE TABLE `subtask` (
  `id` int(255) NOT NULL auto_increment,
  `user_id` int(255) default NULL,
  `todo_id` int(255) default NULL,
  `category_id` int(255) default NULL,
  `title` varchar(255) default NULL,
  `newtask` varchar(500) default NULL,
  `staus` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `subtask` */

insert  into `subtask`(`id`,`user_id`,`todo_id`,`category_id`,`title`,`newtask`,`staus`) values (1,1,2,546,'learn python','learn array','In-Hold'),(3,1,2,546,'learn python','learn DSA','In-progress');

/*Table structure for table `todolist` */

DROP TABLE IF EXISTS `todolist`;

CREATE TABLE `todolist` (
  `Id` int(255) NOT NULL auto_increment,
  `User_id` int(255) default NULL,
  `category_id` int(255) default NULL,
  `title` varchar(255) default NULL,
  `status` varchar(255) default NULL,
  `bookmarked` tinyint(1) default NULL,
  PRIMARY KEY  (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `todolist` */

insert  into `todolist`(`Id`,`User_id`,`category_id`,`title`,`status`,`bookmarked`) values (1,1,813,'learn react','In-progress',1),(2,1,546,'learn python','In-progress',1),(3,1,579,'learn mongodb','Completed',0),(4,1,571,'learn django','Completed',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
