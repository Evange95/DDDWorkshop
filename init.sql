USE mysql;
CREATE DATABASE IF NOT EXISTS evilton;
USE evilton;
CREATE TABLE IF NOT EXISTS aircrafts (Model VARCHAR(255) PRIMARY KEY, Manufacturer VARCHAR(255), Wingspan INT, `CabinWidth` FLOAT, `CabinHeight` FLOAT, `CabinLength` FLOAT, `CargoCapacity` INT, `Range` INT, `CruiseSpeed` INT, `EngineType` VARCHAR(255), `NoiseLevel` VARCHAR(255))