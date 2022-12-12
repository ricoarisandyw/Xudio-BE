import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1670859609156 implements MigrationInterface {
    name = 'migration1670859609156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "lesson" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "room" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "teacher" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "teacher_in_room" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_detail" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_in_course" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_in_room" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "video" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "filled" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "adminRoom" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "idCourse" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "idCourse" SET DEFAULT (0)`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "adminRoom" SET DEFAULT (0)`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "filled" SET DEFAULT (0)`);
        await queryRunner.query(`ALTER TABLE "video" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "user_in_room" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "user_in_course" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "user_detail" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "teacher_in_room" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "teacher" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "room" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "lesson" RENAME COLUMN "updatedAt" TO "updateAt"`);
        await queryRunner.query(`ALTER TABLE "course" RENAME COLUMN "updatedAt" TO "updateAt"`);
    }

}
