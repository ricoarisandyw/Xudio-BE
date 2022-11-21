import express from 'express';
import RoomController from '../controllers/room.controller';

const roomRouter = express.Router();

roomRouter.post('/', RoomController.create)
roomRouter.get('/', RoomController.getAll)
roomRouter.get('/detail/:id', RoomController.getDetail)
roomRouter.post('/join', RoomController.join)
roomRouter.post('/leave', RoomController.leave)
roomRouter.get('/:idRoom/users', RoomController.getAllUsersInRoom)

export default roomRouter