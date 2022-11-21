import express from 'express';
import LessonController from '../controllers/lesson.controller';

const lessonRouter = express.Router();

lessonRouter.get("/", LessonController.getLesson)
lessonRouter.get("/course/:idCourse", LessonController.getLessonByCourseId)
lessonRouter.post("/", LessonController.addLesson)
lessonRouter.put("/", LessonController.updateLesson)
lessonRouter.delete("/:idLesson", LessonController.deleteLesson)

export default lessonRouter