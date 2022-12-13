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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ILesson_1 = require("../src/entity/ILesson");
const response_builder_1 = require("../utils/response-builder");
class LessonController {
}
exports.default = LessonController;
_a = LessonController;
LessonController.getLessonByMultiIdCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessons = yield ILesson_1.ILesson.findBy({
        idCourse: (0, typeorm_1.In)(req.query.idCourse)
    });
    return res.send((0, response_builder_1.success)("Successfully get lesson", lessons));
});
LessonController.getLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessons = yield ILesson_1.ILesson.find();
    return res.send((0, response_builder_1.success)("Successfully get lesson", lessons));
});
LessonController.getLessonByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCourse } = req.params;
    console.log({ idCourse });
    const lesson = yield ILesson_1.ILesson.findBy({
        idCourse: +idCourse
    });
    return res.send((0, response_builder_1.success)("Successfully get lesson", lesson));
});
LessonController.addLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield ILesson_1.ILesson.create(payload).save();
    return res.json((0, response_builder_1.success)("Successfully add lesson", result));
});
LessonController.updateLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield ILesson_1.ILesson.update({
        id: payload.id
    }, payload);
    return res.json((0, response_builder_1.success)("Successfully add lesson", result));
});
LessonController.deleteLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idLesson } = req.params;
    const result = yield ILesson_1.ILesson.delete({
        id: +idLesson
    });
    return res.json((0, response_builder_1.success)("Successfully delete lesson", result));
});
