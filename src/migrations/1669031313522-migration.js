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
exports.migration1669031313522 = void 0;
class migration1669031313522 {
    constructor() {
        this.name = 'migration1669031313522';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE SEQUENCE "teacher_id_seq"`);
            yield queryRunner.query(`CREATE TABLE "teacher" ("id" INT DEFAULT nextval('"teacher_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "name" string NOT NULL, "nip" string NOT NULL, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE SEQUENCE "teacher_in_room_id_seq"`);
            yield queryRunner.query(`CREATE TABLE "teacher_in_room" ("id" INT DEFAULT nextval('"teacher_in_room_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "idRoom" int8 NOT NULL, "idTeacher" int8 NOT NULL, CONSTRAINT "PK_3e2a7acb8520000ca7e75660aa9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "video" ADD "title" string NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "video" ADD "description" string NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "video" DROP COLUMN "description"`);
            yield queryRunner.query(`ALTER TABLE "video" DROP COLUMN "title"`);
            yield queryRunner.query(`DROP TABLE "teacher_in_room"`);
            yield queryRunner.query(`DROP SEQUENCE "teacher_in_room_id_seq"`);
            yield queryRunner.query(`DROP TABLE "teacher"`);
            yield queryRunner.query(`DROP SEQUENCE "teacher_id_seq"`);
        });
    }
}
exports.migration1669031313522 = migration1669031313522;
