import express from 'express';
import RoomController from '../controllers/room.controller';

const roomRouter = express.Router();

roomRouter.post('/', RoomController.create)
roomRouter.get('/', RoomController.getAll)
roomRouter.get('/detail/:id', RoomController.getDetail)
roomRouter.post('/join', RoomController.join)
roomRouter.get('/:idRoom/users', RoomController.getAllUser)

export default roomRouter