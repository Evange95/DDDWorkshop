-- CreateTable
CREATE TABLE `Aircraft` (
    `Id` VARCHAR(191) NOT NULL,
    `Manufacturer` VARCHAR(191) NOT NULL,
    `Wingspan` DOUBLE NOT NULL,
    `CabinWidth` DOUBLE NOT NULL,
    `CabinHeight` DOUBLE NOT NULL,
    `CabinLength` DOUBLE NOT NULL,
    `CargoCapacity` DOUBLE NOT NULL,
    `Range` DOUBLE NOT NULL,
    `CruiseSpeed` DOUBLE NOT NULL,
    `EngineType` VARCHAR(191) NOT NULL,
    `NoiseLevel` VARCHAR(191) NOT NULL,
    `Version` INTEGER NOT NULL,

    UNIQUE INDEX `Aircraft_Id_key`(`Id`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeatType` (
    `Id` VARCHAR(191) NOT NULL,
    `Width` DOUBLE NOT NULL,
    `Height` DOUBLE NOT NULL,
    `Pitch` DOUBLE NOT NULL,
    `Weight` DOUBLE NOT NULL,
    `ProductionDate` VARCHAR(191) NOT NULL,
    `ComfortLevel` VARCHAR(191) NOT NULL,
    `Features` VARCHAR(191) NOT NULL,
    `Version` INTEGER NOT NULL,

    UNIQUE INDEX `SeatType_Id_key`(`Id`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
