-- CreateTable
CREATE TABLE `Ticket` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `startedAt` DATETIME(3) NULL,
    `finishedAt` DATETIME(3) NULL,
    `guicheId` VARCHAR(191) NULL,

    UNIQUE INDEX `Ticket_token_key`(`token`),
    INDEX `Ticket_createdAt_idx`(`createdAt`),
    INDEX `Ticket_status_idx`(`status`),
    INDEX `Ticket_type_idx`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guiche` (
    `id` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'LIVRE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Guiche_numero_key`(`numero`),
    INDEX `Guiche_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LogAtendimento` (
    `id` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `guicheId` VARCHAR(191) NOT NULL,
    `startedAt` DATETIME(3) NOT NULL,
    `finishedAt` DATETIME(3) NOT NULL,
    `duracao` INTEGER NOT NULL,
    `statusFinal` VARCHAR(191) NOT NULL,
    `observacoes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `LogAtendimento_ticketId_key`(`ticketId`),
    INDEX `LogAtendimento_ticketId_idx`(`ticketId`),
    INDEX `LogAtendimento_guicheId_idx`(`guicheId`),
    INDEX `LogAtendimento_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_guicheId_fkey` FOREIGN KEY (`guicheId`) REFERENCES `Guiche`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogAtendimento` ADD CONSTRAINT `LogAtendimento_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogAtendimento` ADD CONSTRAINT `LogAtendimento_guicheId_fkey` FOREIGN KEY (`guicheId`) REFERENCES `Guiche`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
