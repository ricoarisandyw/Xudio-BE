"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = express_1.default.Router();
// CRUD
userRouter.get('/', user_controller_1.default.getAll);
userRouter.post('/', user_controller_1.default.signup);
userRouter.put('/', user_controller_1.default.updateUser);
// USER ROOM
userRouter.get('/rooms', user_controller_1.default.getUserRoom);
userRouter.get('/getUser', user_controller_1.default.getUser);
userRouter.post('/detail', user_controller_1.default.createOrUpdateUserDetail);
userRouter.get('/password', user_controller_1.default.getPassword);
userRouter.post('/login', user_controller_1.default.login);
userRouter.post('/signup', user_controller_1.default.signup);
userRouter.get('/logout', user_controller_1.default.logout);
userRouter.get('/:idUser/course', user_controller_1.default.getCourse);
userRouter.get('/summary', user_controller_1.default.getSummary);
exports.default = userRouter;
