"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const userRouter = express_1.default.Router();
// WITHOUT MIDDLEWARE
userRouter.post('/login', user_controller_1.default.login);
userRouter.post('/signup', user_controller_1.default.signup);
// CRUD
userRouter.get('/', auth_middleware_1.AuthMiddleware, user_controller_1.default.getAll);
userRouter.post('/', auth_middleware_1.AuthMiddleware, user_controller_1.default.signup);
userRouter.put('/', auth_middleware_1.AuthMiddleware, user_controller_1.default.updateUser);
// USER ROOM
userRouter.get('/rooms', user_controller_1.default.getUserRoom);
userRouter.get('/getUser', auth_middleware_1.AuthMiddleware, user_controller_1.default.getUser);
userRouter.post('/detail', auth_middleware_1.AuthMiddleware, user_controller_1.default.createOrUpdateUserDetail);
userRouter.get('/password', auth_middleware_1.AuthMiddleware, user_controller_1.default.getPassword);
userRouter.post('/logout', auth_middleware_1.AuthMiddleware, user_controller_1.default.logout);
userRouter.get('/:idUser/course', auth_middleware_1.AuthMiddleware, user_controller_1.default.getCourse);
userRouter.get('/summary', auth_middleware_1.AuthMiddleware, user_controller_1.default.getSummary);
exports.default = userRouter;
