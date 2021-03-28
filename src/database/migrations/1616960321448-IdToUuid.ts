import {MigrationInterface, QueryRunner} from "typeorm";

export class IdToUuid1616960321448 implements MigrationInterface {
    name = 'IdToUuid1616960321448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `mensagens` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `mensagens` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `mensagens` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `mensagens` ADD `id` varchar(36) NOT NULL PRIMARY KEY");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `mensagens` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `mensagens` ADD `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `mensagens` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `mensagens` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
    }

}
