"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migration1670859609156 = void 0;
class migration1670859609156 {
    constructor() {
        this.name = 'migration1670859609156';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "course" RENAME COLUMN "updateAt" TO "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "lesson" RENAME COLUMN "updateAt" TO "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "room" RENAME COLUMN "updateAt" TO "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "teacher" RENAME COLUMN "updateAt" TO "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "teacher_in_room" RENAME COLUMN "updateAt" TO "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "updateAt" TO "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "user_detail" RENAME COLUMN "updateAt" TO "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "user_in_course" RENAME COLUMN "updateAt" TO "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "user_in_room" RENAME COLUMN "updateAt" TO "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "video" RENAME COLUMN "updateAt" TO "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "filled" SET DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "adminRoom" SET DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "idCourse" SET DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "idCourse" SET DEFAULT (0)`);
            yield queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "adminRoom" SET DEFAULT (0)`);
            yield queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "filled" SET DEFAULT (0)`);
            yield queryRunner.query(`ALTER TABLE "video" RENAME COLUMN "updatedAt" TO "updateAt"`);
            yield queryRunner.query(`ALTER TABLE "user_in_room" RENAME COLUMN "updatedAt" TO "updateAt"`);
            yield queryRunner.query(`ALTER TABLE "user_in_course" RENAME COLUMN "updatedAt" TO "updateAt"`);
            yield queryRunner.query(`ALTER TABLE "user_detail" RENAME COLUMN "updatedAt" TO "updateAt"`);
            yield queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "updatedAt" TO "updateAt"`);
            yield queryRunner.query(`ALTER TABLE "teacher_in_room" RENAME COLUMN "updatedAt" TO "updateAt"`);
            yield queryRunner.query(`ALTER TABLE "teacher" RENAME COLUMN "updatedAt" TO "updateAt"`);
            yield queryRunner.query(`ALTER TABLE "room" RENAME COLUMN "updatedAt" TO "updateAt"`);
            yield queryRunner.query(`ALTER TABLE "lesson" RENAME COLUMN "updatedAt" TO "updateAt"`);
            yield queryRunner.query(`ALTER TABLE "course" RENAME COLUMN "updatedAt" TO "updateAt"`);
        });
    }
}
exports.migration1670859609156 = migration1670859609156;
