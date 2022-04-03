import express from 'express';
import CourseController from '../controllers/course.controller';
import ScoreController from '../controllers/score.controller';

const courseRouter = express.Router();

// STANDARD CRUD
courseRouter.get('/', CourseController.getAllCourse);
courseRouter.get('/:idCourse', CourseController.getCourse);
courseRouter.post('/', CourseController.createOrUpdate);
courseRouter.delete('/:idCourse', CourseController.deleteCourse);

courseRouter.post('/upload', CourseController.upload);
courseRouter.post('/:idCourse/start', CourseController.startCourse);
courseRouter.post('/:idCourse/end', CourseController.endCourse);

export default courseRouter;