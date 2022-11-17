"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const typeorm_1 = require("typeorm");
const IRoom_1 = __importDefault(require("../src/entity/IRoom"));
const response_builder_1 = require("../utils/response-builder");
const prisma = new client_1.PrismaClient();
class RoomController {
}
exports.default = RoomController;
_a = RoomController;
RoomController.getDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const room = yield IRoom_1.default.findOneBy({
        id: +id
    });
    const userInRoom = yield prisma.user_in_room.findMany({
        where: {
            idRoom: +id
        }
    });
    const users = yield prisma.user_detail.findMany({
        where: {
            idUser: {
                in: userInRoom.map((v) => v.idUser || 0)
            }
        }
    });
    console.log({ users });
    // parse
    // {"id", "name", "capacity", "filled", "createdAt", "updatedAt","image", "member(user in room)", "member image", "member id", "admin room": {"name", "nip"}}
    const parse = {
        id: room === null || room === void 0 ? void 0 : room.id,
        capacity: room === null || room === void 0 ? void 0 : room.capacity,
        filled: room === null || room === void 0 ? void 0 : room.filled,
        createdAt: room === null || room === void 0 ? void 0 : room.createdAt,
        updateAt: new Date(),
        image: room === null || room === void 0 ? void 0 : room.image,
        members: userInRoom.map((u) => {
            const usr = users.find((us) => us.idUser === u.idUser);
            return {
                id: u.id,
                name: usr === null || usr === void 0 ? void 0 : usr.name,
                email: usr === null || usr === void 0 ? void 0 : usr.email,
                image: usr === null || usr === void 0 ? void 0 : usr.image
            };
        }),
        adminRoom: room === null || room === void 0 ? void 0 : room.adminRoom
    };
    res.send((0, response_builder_1.success)("Successfully get detail room", parse));
});
RoomController.join = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield prisma.user_in_room.create({
        data: payload
    });
    res.send((0, response_builder_1.success)("Successfully join room", result));
});
RoomController.getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRoom } = req.params;
    const result = yield prisma.user_in_room.findMany({
        where: {
            idRoom: +idRoom
        }
    });
    // AppDataSource.getRepository(IRoom)
    //     .find({
    //         where: {
    //             id: In([])
    //         }
    //     })
    const rooms = yield IRoom_1.default.findBy({
        id: (0, typeorm_1.In)(result.map((r) => r.idRoom || 0))
    });
    // {"id", "name", "capacity", "filled", "createdAt", "updatedAt","image"}
    // parse
    const allRooms = rooms.map((r) => ({
        id: r.id,
        name: r.name,
        capacity: r.capacity,
        filled: r.filled,
        image: "",
        createdAt: r.createdAt,
        updateAt: new Date()
    }));
    res.send((0, response_builder_1.success)("Successfully get all user in room", allRooms));
});
RoomController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield IRoom_1.default.create({
        createdAt: new Date().toISOString(),
        name: payload.name,
        capacity: +payload.capacity,
        filled: +payload.filled,
        adminRoom: +payload.adminRoom,
        image: payload.image,
        status: payload.status
    }).save();
    res.send((0, response_builder_1.success)("Successfully create room", result));
});
RoomController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield IRoom_1.default.find();
    res.send((0, response_builder_1.success)("Successfully get all room", result));
});
