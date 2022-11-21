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
exports.migration1669013908828 = void 0;
class migration1669013908828 {
    constructor() {
        this.name = 'migration1669013908828';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_in_course" ALTER COLUMN "startCourse" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user_in_course" ALTER COLUMN "endCourse" DROP NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_in_course" ALTER COLUMN "endCourse" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user_in_course" ALTER COLUMN "startCourse" SET NOT NULL`);
        });
    }
}
exports.migration1669013908828 = migration1669013908828;
