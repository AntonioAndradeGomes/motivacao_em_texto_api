import {MigrationInterface, QueryRunner} from "typeorm";

export class TrocandoVarcharParaText1616260504890 implements MigrationInterface {
    name = 'TrocandoVarcharParaText1616260504890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `mensagens` (`id` int NOT NULL AUTO_INCREMENT, `texto` text NOT NULL, `autor` varchar(255) NOT NULL, `cor` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `mensagens`");
    }

}
