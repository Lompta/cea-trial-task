-- MySQL Script generated by MySQL Workbench
-- Sat 29 Jul 2017 02:17:52 PM EDT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema cea_trial_task
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cea_trial_task
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cea_trial_task` DEFAULT CHARACTER SET utf8 ;
USE `cea_trial_task` ;

-- -----------------------------------------------------
-- Table `cea_trial_task`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cea_trial_task`.`User` (
  `UserId` INT NOT NULL,
  `UserFirstName` VARCHAR(45) NULL,
  `UserLastName` VARCHAR(45) NULL,
  `Username` VARCHAR(20) NULL,
  `PasswordHashed` VARCHAR(1000) NULL,
  `Salt` VARCHAR(1000) NULL,
  `IsActive` VARCHAR(45) NULL,
  PRIMARY KEY (`UserId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cea_trial_task`.`UserIncome`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cea_trial_task`.`UserIncome` (
  `UserIncomeId` INT NOT NULL,
  `UserId` INT NULL,
  `Income` DECIMAL(10,0) NULL,
  `IsCurrent` TINYINT(1) NULL,
  PRIMARY KEY (`UserIncomeId`),
  INDEX `fk_UserIncome_1_idx` (`UserId` ASC),
  CONSTRAINT `fk_UserIncome_1`
    FOREIGN KEY (`UserId`)
    REFERENCES `cea_trial_task`.`User` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cea_trial_task`.`UserPledge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cea_trial_task`.`UserPledge` (
  `UserPledgeId` INT NOT NULL,
  `UserId` INT NULL,
  `PledgeAmount` INT NULL,
  PRIMARY KEY (`UserPledgeId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cea_trial_task`.`UserDonation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cea_trial_task`.`UserDonation` (
  `UserDonationId` INT NOT NULL,
  `Amount` DECIMAL(10,2) NULL,
  `DonatedDate` DATE NULL,
  `UserId` INT NULL,
  `DonationOrg` VARCHAR(100) NULL,
  PRIMARY KEY (`UserDonationId`),
  INDEX `fk_UserDonation_1_idx` (`UserId` ASC),
  CONSTRAINT `fk_UserDonation_1`
    FOREIGN KEY (`UserId`)
    REFERENCES `cea_trial_task`.`User` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE USER 'cea_trial_user' IDENTIFIED BY 'Jalak8uWest!';

GRANT SELECT ON TABLE `cea_trial_task`.* TO 'cea_trial_user';
GRANT SELECT, INSERT, TRIGGER ON TABLE `cea_trial_task`.* TO 'cea_trial_user';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `cea_trial_task`.* TO 'cea_trial_user';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;