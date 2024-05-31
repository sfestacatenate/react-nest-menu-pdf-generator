CREATE TABLE `restaurants`.`menus` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `categories` JSON NULL,
  `pdf_hash` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));