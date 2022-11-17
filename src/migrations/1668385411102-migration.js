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
exports.migration1668385411102 = void 0;
class migration1668385411102 {
    constructor() {
        this.name = 'migration1668385411102';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE SEQUENCE "room_id_seq"`);
            yield queryRunner.query(`CREATE TABLE "room" ("id" INT DEFAULT nextval('"room_id_seq"') NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT current_timestamp(), "updateAt" timestamptz, "name" string NOT NULL, "status" string NOT NULL, "filled" int8 NOT NULL, "capacity" int8 NOT NULL, "adminRoom" int8 NOT NULL, "image" string NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "room"`);
            yield queryRunner.query(`DROP SEQUENCE "room_id_seq"`);
        });
    }
}
exports.migration1668385411102 = migration1668385411102;
