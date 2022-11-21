import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1669013908828 implements MigrationInterface {
    name = 'migration1669013908828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_in_course" ALTER COLUMN "startCourse" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_in_course" ALTER COLUMN "endCourse" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_in_course" ALTER COLUMN "endCourse" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_in_course" ALTER COLUMN "startCourse" SET NOT NULL`);
    }

}
