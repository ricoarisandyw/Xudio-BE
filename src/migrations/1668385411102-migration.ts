import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1668385411102 implements MigrationInterface {
    name = 'migration1668385411102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE "room_id_seq"`);
        await queryRunner.query(`CREATE TABLE "room" ("id" INT DEFAULT nextval('"room_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "name" string NOT NULL, "status" string NOT NULL, "filled" int8 NOT NULL, "capacity" int8 NOT NULL, "adminRoom" int8 NOT NULL, "image" string NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP SEQUENCE "room_id_seq"`);
    }

}
