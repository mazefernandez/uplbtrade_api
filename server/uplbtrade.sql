DROP DATABASE IF EXISTS uplbtrade;
CREATE DATABASE uplbtrade;
USE uplbtrade;

CREATE TABLE `Admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `admin_id_UNIQUE` (`admin_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

CREATE TABLE `Customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_no` varchar(11) DEFAULT NULL,
  `overall_rating` decimal(2,1) DEFAULT '0.0',
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `customer_id_UNIQUE` (`customer_id`)
);

CREATE TABLE `Application_Review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` decimal(2,1) DEFAULT '0.0',
  `review` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `review_id_UNIQUE` (`review_id`),
  KEY `fk_review_customer_idx` (`customer_id`),
  CONSTRAINT `fk_review_customer` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `Customer_Report` (
  `report_id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `reporter_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`report_id`),
  KEY `fk_report_reporter_idx` (`reporter_id`),
  KEY `fk_report_customer_idx` (`customer_id`),
  CONSTRAINT `fk_report_customer` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_report_reporter` FOREIGN KEY (`reporter_id`) REFERENCES `Customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `Item` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(15,2) DEFAULT '0.00',
  `image` varchar(255) NOT NULL,
  `condition` varchar(100) NOT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `customer_id_idx` (`customer_id`),
  CONSTRAINT `fk_item_customer` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE `Offer` (
  `offer_id` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(15,2) DEFAULT '0.00',
  `status` enum('Pending','Accepted','Declined') NOT NULL DEFAULT 'Pending',
  `message` varchar(255) DEFAULT NULL,
  `item_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  PRIMARY KEY (`offer_id`),
  UNIQUE KEY `offer_id_UNIQUE` (`offer_id`),
  KEY `fk_offer_item_idx` (`item_id`),
  KEY `fk_offer_buyer_idx` (`buyer_id`),
  KEY `fk_offer_seller_idx` (`seller_id`),
  CONSTRAINT `fk_offer_buyer` FOREIGN KEY (`buyer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_offer_item` FOREIGN KEY (`item_id`) REFERENCES `Item` (`item_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_offer_seller` FOREIGN KEY (`seller_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE `Tag` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
);

CREATE TABLE `Tagmap` (
  `tagmap_id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`tagmap_id`),
  KEY `fk_tagmap_item_idx` (`item_id`),
  KEY `fk_tagmap_tag_idx` (`tag_id`),
  CONSTRAINT `fk_tagmap_item` FOREIGN KEY (`item_id`) REFERENCES `Item` (`item_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_tagmap_tag` FOREIGN KEY (`tag_id`) REFERENCES `Tag` (`tag_id`) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE `Transaction` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `offer_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  UNIQUE KEY `transaction_id_UNIQUE` (`transaction_id`),
  KEY `fk_transaction_item_idx` (`item_id`),
  KEY `fk_transaction_offer_idx` (`offer_id`),
  KEY `fk_transaction_seller_idx` (`seller_id`),
  KEY `fk_transaction_buyer_idx` (`buyer_id`),
  CONSTRAINT `fk_transaction_buyer` FOREIGN KEY (`buyer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_item` FOREIGN KEY (`item_id`) REFERENCES `Item` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_offer` FOREIGN KEY (`offer_id`) REFERENCES `Offer` (`offer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_seller` FOREIGN KEY (`seller_id`) REFERENCES `Customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `Customer_Review` (
  `customer_review_id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` decimal(2,1) DEFAULT '0.0',
  `review` varchar(255) DEFAULT NULL,
  `rater_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  PRIMARY KEY (`customer_review_id`),
  KEY `fk_creview_rater_idx` (`rater_id`),
  KEY `fk_creview_customer_idx` (`customer_id`),
  KEY `fk_creview_transaction_idx` (`transaction_id`),
  CONSTRAINT `fk_creview_customer` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_creview_rater` FOREIGN KEY (`rater_id`) REFERENCES `Customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_creview_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction` (`transaction_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `Transaction_Tracking` (
  `tracking_id` int(11) NOT NULL AUTO_INCREMENT,
  `status` enum('Order placed','Meet-up confirmed','Order received','Order canceled') NOT NULL DEFAULT 'Order placed',
  `date` timestamp(6) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  PRIMARY KEY (`tracking_id`),
  UNIQUE KEY `tracking_id_UNIQUE` (`tracking_id`),
  KEY `fk_tracking_transaction_idx` (`transaction_id`),
  CONSTRAINT `fk_tracking_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction` (`transaction_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

INSERT INTO `Admin` (`name`, `email`, `password`)
VALUES (`Maze Fernandez`, `aafernandez5@up.edu.ph`, `petrichor11`)
