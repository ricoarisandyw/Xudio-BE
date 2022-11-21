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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ITeacher_1 = __importDefault(require("../src/entity/ITeacher"));
const ITeacherInRoom_1 = __importDefault(require("../src/entity/ITeacherInRoom"));
const response_builder_1 = require("../utils/response-builder");
class TeacherController {
}
exports.default = TeacherController;
_a = TeacherController;
TeacherController.addTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield ITeacher_1.default.create(payload).save();
    res.json((0, response_builder_1.success)("Successfully add teacher", result));
});
TeacherController.assignTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const existing = yield ITeacherInRoom_1.default.findBy({
        idRoom: +payload.idRoom
    });
    if (existing.length > 0) {
        yield ITeacherInRoom_1.default.update({
            idRoom: payload.idRoom
        }, payload);
        res.json((0, response_builder_1.success)("Successfully update assigned teacher", payload));
    }
    else {
        const result = yield ITeacherInRoom_1.default.create(payload).save();
        res.json((0, response_builder_1.success)("Successfully assign teacher", {
            idRoom: result.idRoom,
            idTeacher: result.idTeacher
        }));
    }
});
