import express from "express";
import TeacherController from "../controllers/teacher.controller";

export const teacherRouter = express.Router();

teacherRouter.post("/", TeacherController.addTeacher)
teacherRouter.post("/assign", TeacherController.assignTeacher)