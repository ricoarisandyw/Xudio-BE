import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1670852366168 implements MigrationInterface {
    name = 'migration1670852366168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ADD "idCourse" int8 NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "idCourse"`);
    }

}
