"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRouter = void 0;
const express_1 = __importDefault(require("express"));
const teacher_controller_1 = __importDefault(require("../controllers/teacher.controller"));
exports.teacherRouter = express_1.default.Router();
exports.teacherRouter.post("/", teacher_controller_1.default.addTeacher);
exports.teacherRouter.post("/assign", teacher_controller_1.default.assignTeacher);
