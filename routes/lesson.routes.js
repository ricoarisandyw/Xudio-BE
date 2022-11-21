"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lesson_controller_1 = __importDefault(require("../controllers/lesson.controller"));
const lessonRouter = express_1.default.Router();
lessonRouter.get("/", lesson_controller_1.default.getLesson);
lessonRouter.get("/course/:idCourse", lesson_controller_1.default.getLessonByCourseId);
lessonRouter.post("/", lesson_controller_1.default.addLesson);
lessonRouter.put("/", lesson_controller_1.default.updateLesson);
lessonRouter.delete("/:idLesson", lesson_controller_1.default.deleteLesson);
exports.default = lessonRouter;
