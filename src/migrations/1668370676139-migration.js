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
exports.migration1668370676139 = void 0;
class migration1668370676139 {
    constructor() {
        this.name = 'migration1668370676139';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE SEQUENCE "course_id_seq"`);
            yield queryRunner.query(`CREATE TABLE "course" ("id" INT DEFAULT nextval('"course_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "name" string NOT NULL, "description" string NOT NULL, "beginDate" string NOT NULL, "dueDate" string NOT NULL, "companyId" int8 NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE SEQUENCE "user_id_seq"`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" INT DEFAULT nextval('"user_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "username" string NOT NULL, "password" string NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE SEQUENCE "user_detail_id_seq"`);
            yield queryRunner.query(`CREATE TABLE "user_detail" ("id" INT DEFAULT nextval('"user_detail_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "idUser" int8 NOT NULL, "email" string NOT NULL, "image" string NOT NULL, "name" string NOT NULL, "nip" string NOT NULL, "role" string NOT NULL, CONSTRAINT "PK_673613c95633d9058a44041794d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE SEQUENCE "user_in_course_id_seq"`);
            yield queryRunner.query(`CREATE TABLE "user_in_course" ("id" INT DEFAULT nextval('"user_in_course_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "idCourse" int8 NOT NULL, "idUser" int8 NOT NULL, "score" int8 NOT NULL, "startCourse" timestamptz NOT NULL, "endCourse" timestamptz NOT NULL, CONSTRAINT "PK_f84eec98e7df1d11a151f4d751a" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE SEQUENCE "video_id_seq"`);
            yield queryRunner.query(`CREATE TABLE "video" ("id" INT DEFAULT nextval('"video_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "link" string NOT NULL, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "video"`);
            yield queryRunner.query(`DROP SEQUENCE "video_id_seq"`);
            yield queryRunner.query(`DROP TABLE "user_in_course"`);
            yield queryRunner.query(`DROP SEQUENCE "user_in_course_id_seq"`);
            yield queryRunner.query(`DROP TABLE "user_detail"`);
            yield queryRunner.query(`DROP SEQUENCE "user_detail_id_seq"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP SEQUENCE "user_id_seq"`);
            yield queryRunner.query(`DROP TABLE "course"`);
            yield queryRunner.query(`DROP SEQUENCE "course_id_seq"`);
        });
    }
}
exports.migration1668370676139 = migration1668370676139;
