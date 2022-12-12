"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_controller_1 = __importDefault(require("../controllers/room.controller"));
const roomRouter = express_1.default.Router();
roomRouter.post('/', room_controller_1.default.create);
roomRouter.get('/', room_controller_1.default.getAll);
roomRouter.get('/detail/:id', room_controller_1.default.getDetail);
roomRouter.post('/join', room_controller_1.default.join);
roomRouter.post('/leave', room_controller_1.default.leave);
roomRouter.get('/:idRoom/users', room_controller_1.default.getAllUsersInRoom);
roomRouter.delete('/:idRoom', room_controller_1.default.deleteRoom);
exports.default = roomRouter;
