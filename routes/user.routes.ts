import express from 'express';
import UserController from '../controllers/user.controller';

const userRouter = express.Router();

// CRUD
userRouter.get('/', UserController.getAll);
userRouter.post('/', UserController.signup);
userRouter.put('/', UserController.updateUser);

// USER ROOM

userRouter.get('/getUser', UserController.getUser)
userRouter.post('/detail', UserController.createOrUpdateUserDetail)
userRouter.get('/password', UserController.getPassword)
userRouter.post('/login', UserController.login);
userRouter.post('/signup', UserController.signup);
userRouter.get('/logout', UserController.logout);
userRouter.get('/:idUser/course', UserController.getCourse);
userRouter.get('/summary', UserController.getSummary)

export default userRouter;
