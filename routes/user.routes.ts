import express from 'express';
import UserController from '../controllers/user.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const userRouter = express.Router();

// WITHOUT MIDDLEWARE
userRouter.post('/login', UserController.login);
userRouter.post('/signup', UserController.signup);

// CRUD
userRouter.get('/', AuthMiddleware, UserController.getAll);
userRouter.post('/', AuthMiddleware, UserController.signup);
userRouter.put('/', AuthMiddleware, UserController.updateUser);

// USER ROOM
userRouter.get('/rooms', UserController.getUserRoom)

userRouter.get('/getUser', AuthMiddleware, UserController.getUser)
userRouter.post('/detail', AuthMiddleware, UserController.createOrUpdateUserDetail)
userRouter.get('/password', AuthMiddleware, UserController.getPassword)
userRouter.get('/logout', AuthMiddleware, UserController.logout);
userRouter.get('/:idUser/course', AuthMiddleware, UserController.getCourse);
userRouter.get('/summary', AuthMiddleware, UserController.getSummary)

export default userRouter;
