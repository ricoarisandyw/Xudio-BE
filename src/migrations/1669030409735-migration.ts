import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1669030409735 implements MigrationInterface {
    name = 'migration1669030409735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE "lesson_id_seq"`);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" INT DEFAULT nextval('"lesson_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "idCourse" int8 NOT NULL, "image" string NOT NULL, "title" string NOT NULL, "description" string NOT NULL, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP SEQUENCE "lesson_id_seq"`);
    }

}
