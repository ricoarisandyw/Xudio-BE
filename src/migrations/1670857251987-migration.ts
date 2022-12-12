import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1670857251987 implements MigrationInterface {
    name = 'migration1670857251987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "filled" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "adminRoom" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "idCourse" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "idCourse" SET DEFAULT (0)`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "adminRoom" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "filled" DROP DEFAULT`);
    }

}
