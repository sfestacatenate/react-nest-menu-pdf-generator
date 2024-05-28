CREATE TABLE `restaurants`.`menus` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `categories` JSON NULL,
  PRIMARY KEY (`id`));