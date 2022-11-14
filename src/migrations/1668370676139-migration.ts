import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1668370676139 implements MigrationInterface {
    name = 'migration1668370676139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE "course_id_seq"`);
        await queryRunner.query(`CREATE TABLE "course" ("id" INT DEFAULT nextval('"course_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "name" string NOT NULL, "description" string NOT NULL, "beginDate" string NOT NULL, "dueDate" string NOT NULL, "companyId" int8 NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE SEQUENCE "user_id_seq"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" INT DEFAULT nextval('"user_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "username" string NOT NULL, "password" string NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE SEQUENCE "user_detail_id_seq"`);
        await queryRunner.query(`CREATE TABLE "user_detail" ("id" INT DEFAULT nextval('"user_detail_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "idUser" int8 NOT NULL, "email" string NOT NULL, "image" string NOT NULL, "name" string NOT NULL, "nip" string NOT NULL, "role" string NOT NULL, CONSTRAINT "PK_673613c95633d9058a44041794d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE SEQUENCE "user_in_course_id_seq"`);
        await queryRunner.query(`CREATE TABLE "user_in_course" ("id" INT DEFAULT nextval('"user_in_course_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "idCourse" int8 NOT NULL, "idUser" int8 NOT NULL, "score" int8 NOT NULL, "startCourse" timestamptz NOT NULL, "endCourse" timestamptz NOT NULL, CONSTRAINT "PK_f84eec98e7df1d11a151f4d751a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE SEQUENCE "video_id_seq"`);
        await queryRunner.query(`CREATE TABLE "video" ("id" INT DEFAULT nextval('"video_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "link" string NOT NULL, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "video"`);
        await queryRunner.query(`DROP SEQUENCE "video_id_seq"`);
        await queryRunner.query(`DROP TABLE "user_in_course"`);
        await queryRunner.query(`DROP SEQUENCE "user_in_course_id_seq"`);
        await queryRunner.query(`DROP TABLE "user_detail"`);
        await queryRunner.query(`DROP SEQUENCE "user_detail_id_seq"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP SEQUENCE "user_id_seq"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP SEQUENCE "course_id_seq"`);
    }

}
