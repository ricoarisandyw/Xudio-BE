import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1669012453431 implements MigrationInterface {
    name = 'migration1669012453431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE "user_in_room_id_seq"`);
        await queryRunner.query(`CREATE TABLE "user_in_room" ("id" INT DEFAULT nextval('"user_in_room_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "idUser" int8 NOT NULL, "idRoom" int8 NOT NULL, CONSTRAINT "PK_a0156da8fb85bdeb55d79672308" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_in_room"`);
        await queryRunner.query(`DROP SEQUENCE "user_in_room_id_seq"`);
    }

}
