import express from 'express';
import CourseController from '../controllers/course.controller';
import ScoreController from '../controllers/score.controller';

const courseRouter = express.Router();

courseRouter.post('/:idCourse/start', CourseController.startCourse);
courseRouter.post('/:idCourse/end', CourseController.endCourse);

export default courseRouter;
