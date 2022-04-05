import express from 'express';
import RoomController from '../controllers/room.controller';

const roomRouter = express.Router();

roomRouter.post('/', RoomController.create)
roomRouter.get('/', RoomController.getAll)

export default roomRouter