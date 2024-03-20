-- CreateTable
CREATE TABLE `Row` (
    `Id` VARCHAR(191) NOT NULL,
    `SeatId` VARCHAR(191) NOT NULL,
    `Version` INTEGER NOT NULL,

    UNIQUE INDEX `Row_Id_key`(`Id`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CabinLayout` (
    `Id` VARCHAR(191) NOT NULL,
    `Width` INTEGER NOT NULL,
    `Length` INTEGER NOT NULL,
    `RowsId` VARCHAR(191) NOT NULL,
    `Version` INTEGER NOT NULL,

    UNIQUE INDEX `CabinLayout_Id_key`(`Id`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Row` ADD CONSTRAINT `Row_SeatId_fkey` FOREIGN KEY (`SeatId`) REFERENCES `SeatType`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CabinLayout` ADD CONSTRAINT `CabinLayout_RowsId_fkey` FOREIGN KEY (`RowsId`) REFERENCES `Row`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
