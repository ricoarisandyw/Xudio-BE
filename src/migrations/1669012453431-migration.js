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
exports.migration1669012453431 = void 0;
class migration1669012453431 {
    constructor() {
        this.name = 'migration1669012453431';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE SEQUENCE "user_in_room_id_seq"`);
            yield queryRunner.query(`CREATE TABLE "user_in_room" ("id" INT DEFAULT nextval('"user_in_room_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "idUser" int8 NOT NULL, "idRoom" int8 NOT NULL, CONSTRAINT "PK_a0156da8fb85bdeb55d79672308" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "user_in_room"`);
            yield queryRunner.query(`DROP SEQUENCE "user_in_room_id_seq"`);
        });
    }
}
exports.migration1669012453431 = migration1669012453431;
