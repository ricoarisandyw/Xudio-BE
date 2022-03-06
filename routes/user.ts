import express from 'express';
import UserController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/:idUser/summary', UserController.getSummary)
userRouter.get('/:idUser', UserController.getUser)
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);
userRouter.get('/:idUser/course', UserController.getCourse);

export default userRouter;
