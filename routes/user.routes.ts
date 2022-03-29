import express from 'express';
import UserController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/:idUser/summary', UserController.getSummary)
userRouter.get('/getUser', UserController.getUser)
userRouter.post('/detail', UserController.createOrUpdateUserDetail)
userRouter.get('/password', UserController.getPassword)
userRouter.post('/login', UserController.login);
userRouter.post('/signup', UserController.signup);
userRouter.post('/logout', UserController.logout);
userRouter.get('/:idUser/course', UserController.getCourse);

export default userRouter;
