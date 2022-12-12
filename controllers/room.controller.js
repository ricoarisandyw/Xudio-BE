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
const typeorm_1 = require("typeorm");
const IRoom_1 = __importDefault(require("../src/entity/IRoom"));
const ITeacher_1 = __importDefault(require("../src/entity/ITeacher"));
const ITeacherInRoom_1 = __importDefault(require("../src/entity/ITeacherInRoom"));
const IUserDetail_1 = __importDefault(require("../src/entity/IUserDetail"));
const IUserInRoom_1 = require("../src/entity/IUserInRoom");
const response_builder_1 = require("../utils/response-builder");
class RoomController {
}
exports.default = RoomController;
_a = RoomController;
RoomController.deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRoom } = req.params;
    yield IRoom_1.default.createQueryBuilder().where("id = :id", { id: idRoom }).delete().execute();
    res.send((0, response_builder_1.success)("Successfully delete room"));
});
RoomController.getDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const room = yield IRoom_1.default.findOneBy({
        id: +id
    });
    // Get Users
    const userInRoom = yield IUserInRoom_1.IUserInRoom.findBy({
        idRoom: +id
    });
    const users = yield IUserDetail_1.default.find({
        where: {
            idUser: (0, typeorm_1.In)(userInRoom.map((v) => v.idUser || 0))
        }
    });
    // Get Teacher
    const teacherInRoom = yield ITeacherInRoom_1.default.findOneBy({
        idRoom: +id
    });
    const teacher = yield ITeacher_1.default.findOneBy({
        id: teacherInRoom === null || teacherInRoom === void 0 ? void 0 : teacherInRoom.id
    });
    // parse
    const parse = {
        id: room === null || room === void 0 ? void 0 : room.id,
        capacity: room === null || room === void 0 ? void 0 : room.capacity,
        filled: room === null || room === void 0 ? void 0 : room.filled,
        createdAt: room === null || room === void 0 ? void 0 : room.createdAt,
        updateAt: new Date(),
        image: room === null || room === void 0 ? void 0 : room.image,
        teacher: teacher,
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
    const existing = yield IUserInRoom_1.IUserInRoom.findOneBy({
        idRoom: payload.idRoom,
        idUser: payload.idUser
    });
    if (existing) {
        return res.json((0, response_builder_1.failed)("User already in room"));
    }
    else {
        const newData = new IUserInRoom_1.IUserInRoom();
        newData.idRoom = payload.idRoom;
        newData.idUser = payload.idUser;
        const result = yield newData.save();
        return res.send((0, response_builder_1.success)("Successfully join room", result));
    }
});
RoomController.leave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield IUserInRoom_1.IUserInRoom.delete(Object.assign({}, payload));
    res.send((0, response_builder_1.success)("Successfully leave room"));
});
RoomController.getAllUsersInRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRoom } = req.params;
    const usersInRoom = yield IUserInRoom_1.IUserInRoom.findBy({
        idRoom: +idRoom
    });
    res.send((0, response_builder_1.success)("Successfully get all user in room", usersInRoom));
});
RoomController.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield IRoom_1.default.create(Object.assign({ createdAt: new Date().toISOString() }, payload)).save();
        res.send((0, response_builder_1.success)("Successfully create room", result));
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});
RoomController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield IRoom_1.default.find();
    res.send((0, response_builder_1.success)("Successfully get all room", result));
});
