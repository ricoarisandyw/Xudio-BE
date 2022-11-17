"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
const courseRouter = express_1.default.Router();
// STANDARD CRUD
courseRouter.get('/', course_controller_1.default.getAllCourse);
courseRouter.get('/:idCourse', course_controller_1.default.getCourse);
courseRouter.post('/', course_controller_1.default.createOrUpdate);
courseRouter.delete('/:idCourse', course_controller_1.default.deleteCourse);
courseRouter.post('/upload', course_controller_1.default.upload);
courseRouter.post('/:idCourse/start', course_controller_1.default.startCourse);
courseRouter.post('/:idCourse/end', course_controller_1.default.endCourse);
exports.default = courseRouter;
