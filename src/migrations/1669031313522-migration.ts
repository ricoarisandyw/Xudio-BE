import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1669031313522 implements MigrationInterface {
    name = 'migration1669031313522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE "teacher_id_seq"`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" INT DEFAULT nextval('"teacher_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "name" string NOT NULL, "nip" string NOT NULL, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE SEQUENCE "teacher_in_room_id_seq"`);
        await queryRunner.query(`CREATE TABLE "teacher_in_room" ("id" INT DEFAULT nextval('"teacher_in_room_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "idRoom" int8 NOT NULL, "idTeacher" int8 NOT NULL, CONSTRAINT "PK_3e2a7acb8520000ca7e75660aa9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "video" ADD "title" string NOT NULL`);
        await queryRunner.query(`ALTER TABLE "video" ADD "description" string NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "title"`);
        await queryRunner.query(`DROP TABLE "teacher_in_room"`);
        await queryRunner.query(`DROP SEQUENCE "teacher_in_room_id_seq"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP SEQUENCE "teacher_id_seq"`);
    }

}
