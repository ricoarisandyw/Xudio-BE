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
const bcrypt_1 = __importDefault(require("bcrypt"));
const IUser_1 = __importDefault(require("../src/entity/IUser"));
const encrypt_1 = require("../utils/encrypt");
const json_util_1 = require("../utils/json.util");
const jwt_util_1 = require("../utils/jwt-util");
const response_builder_1 = require("../utils/response-builder");
const prisma = new client_1.PrismaClient();
class UserController {
}
exports.default = UserController;
_a = UserController;
UserController.getUserRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.authorization) {
            let encryptedPassword = '';
            const id = (0, jwt_util_1.getIdFromJWT)(req.headers.authorization.replace('Bearer ', ''));
            const result = yield prisma.user_in_room.findMany({
                where: {
                    idUser: +id
                }
            });
            const rooms = yield prisma.room.findMany({
                where: {
                    id: {
                        in: result.map((r) => r.idRoom || 0)
                    }
                }
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
            res.send((0, response_builder_1.success)("Successfully get my room", allRooms));
        }
        else {
            res.send((0, response_builder_1.failed)('Authorization not found', {}));
        }
    }
    catch (e) {
        res.send((0, response_builder_1.failed)("Failed to update password", e));
    }
});
UserController.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.authorization) {
            let encryptedPassword = '';
            const id = (0, jwt_util_1.getIdFromJWT)(req.headers.authorization.replace('Bearer ', ''));
            const { oldPassword, newPassword } = req.body;
            const user = yield prisma.user.findFirst({
                where: {
                    id: +id
                }
            });
            if (!user) {
                res.send((0, response_builder_1.failed)('User not found', {}));
            }
            if (user && oldPassword && user.password) {
                const check = yield (0, encrypt_1.checkEncrypt)(oldPassword, user.password);
                if (!check) {
                    res.send((0, response_builder_1.failed)('Wrong password', {}));
                }
                encryptedPassword = yield (0, encrypt_1.encrypt)(newPassword);
            }
            const updatedUser = yield prisma.user.update({
                where: {
                    id: +id
                },
                data: {
                    password: encryptedPassword
                }
            });
            res.send((0, response_builder_1.success)("Successfully update password", updatedUser));
        }
        else {
            res.send((0, response_builder_1.failed)('Authorization not found', {}));
        }
    }
    catch (e) {
        res.send((0, response_builder_1.failed)("Failed to update password", e));
    }
});
UserController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET ALL");
    try {
        const users = yield prisma.user.findMany();
        const userWithDetail = yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const detail = yield prisma.user_detail.findFirst({
                where: {
                    idUser: user.id
                }
            });
            return (0, json_util_1.convertNullToEmptyString)(Object.assign(Object.assign({}, user), { password: "", status: "active", detail: detail ? detail : {} }));
        })));
        res.send((0, response_builder_1.success)("Successfully get all users", userWithDetail));
    }
    catch (error) {
        res.send((0, response_builder_1.failed)("Failed to get all users", error));
    }
});
UserController.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield IUser_1.default.findOneBy({
        username: req.body.username
    });
    if (!exist) {
        const user = new IUser_1.default();
        user.username = req.body.username;
        user.password = yield (0, encrypt_1.encrypt)(req.body.password);
        const saved = yield user.save();
        res.send({ message: "User successfully registered", data: saved });
    }
    else {
        res.send({ message: "Username already exist" });
    }
});
UserController.getPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = "12345";
    const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
    res.cookie('jwt', (0, jwt_util_1.generateAccessToken)({ userId: 'rico' }));
    res.send((0, response_builder_1.success)("Successfully get password", {
        password: encryptedPassword
    }));
});
UserController.createOrUpdateUserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const jwt = req.cookies.jwt;
    const iduser = (0, jwt_util_1.getIdFromJWT)(jwt);
    try {
        const existing = yield prisma.user_detail.findFirst({
            where: {
                idUser: +iduser
            }
        });
        console.log("Existing", existing, iduser, payload);
        if (existing) {
            const updated = yield prisma.user_detail.updateMany({
                where: {
                    idUser: +iduser
                },
                data: Object.assign({}, payload)
            });
            res.send((0, response_builder_1.success)("Successfully update user detail", updated));
        }
        else {
            yield prisma.user_detail.create({
                data: Object.assign(Object.assign({}, payload), { iduser: +iduser }),
            });
            res.send((0, response_builder_1.success)("Successfully create user detail", {
                payload
            }));
        }
    }
    catch (error) {
        res.send({ message: error }).status(500);
    }
});
UserController.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers);
    const jwt = req.headers.authorization;
    try {
        if (jwt) {
            const iduser = (0, jwt_util_1.getIdFromJWT)(jwt.replace("Bearer ", ""));
            const user_detail = yield prisma.user_detail.findFirst({
                where: {
                    idUser: +iduser
                }
            });
            const removeNull = JSON.parse(JSON.stringify(user_detail).replace(/null/g, "\"\""));
            // parse
            const response = {
                id: removeNull.id,
                email: removeNull.email,
                image: removeNull.image,
                name: removeNull.name,
                nip: removeNull.nip,
                role: removeNull.role
            };
            res.send((0, response_builder_1.success)("Successfully get user", response));
        }
        else {
            throw new Error("No token found");
        }
    }
    catch (e) {
        res.send((0, response_builder_1.failed)(e.message, {}));
    }
});
UserController.getSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET SUMMARY");
    const jwt = req.headers.authorization;
    try {
        if (jwt) {
            // {"id", "email", "image", "name", "nip", "role"=["ADMIN","USER"], "completedCourse", "totalCourse", "averageScore", "roomJoined"="1234"}
            const iduser = (0, jwt_util_1.getIdFromJWT)(jwt.replace("Bearer ", ""));
            const user = yield prisma.user.findFirst({
                where: {
                    id: +iduser
                }
            });
            console.log({ user });
            const user_detail = yield prisma.user_detail.findFirst({
                where: {
                    idUser: +iduser
                }
            });
            console.log({ user_detail });
            const courses = yield prisma.user_in_course.findMany({
                where: {
                    iduser: +iduser
                }
            });
            console.log({ courses });
            res.send((0, response_builder_1.success)("Successfully get summary", {
                "id": user === null || user === void 0 ? void 0 : user.id,
                "email": user_detail === null || user_detail === void 0 ? void 0 : user_detail.email,
                "image": user_detail === null || user_detail === void 0 ? void 0 : user_detail.image,
                "name": user_detail === null || user_detail === void 0 ? void 0 : user_detail.name,
                "nip": user_detail === null || user_detail === void 0 ? void 0 : user_detail.nip,
                "role": user_detail === null || user_detail === void 0 ? void 0 : user_detail.role,
                "completedCourse": courses.length,
                "totalCourse": courses.length,
                "averageScore": courses.length,
                "roomJoined": courses.length
            }));
        }
        else {
            res.send((0, response_builder_1.failed)("JWT false", {}));
        }
    }
    catch (e) {
        res.send((0, response_builder_1.failed)(e.message, {}));
    }
});
UserController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield IUser_1.default.findOneBy({
        username: req.body.username
    });
    if (user && user.password && (yield (0, encrypt_1.checkEncrypt)(req.body.password, user.password))) {
        const token = (0, jwt_util_1.generateAccessToken)({ id: user.id });
        res.cookie('jwt', token);
        res.send((0, response_builder_1.success)("Successfully logged in", {
            "id": user.id,
            "isSuccess": true,
            "token": token
        }));
    }
    else {
        res.status(500).send((0, response_builder_1.failed)('Something wrong', {
            "message": "please check your username and password"
        }));
    }
});
UserController.logout = (req, res) => {
    res.cookie('jwt', (0, jwt_util_1.logoutJWT)());
    res.send((0, response_builder_1.success)("Logout", {
        "isSuccess": true
    }));
};
UserController.getCourse = (req, res) => {
    res.send((0, response_builder_1.success)("Get Course", [
        {
            "uuid": "2",
            "name": "Course Soldering",
            "description": "Practice soldering",
            "companyID": "1",
            "progress": 0.3,
            "startCourseAt": "2022-01-10T14:06:55.441Z",
            "duration": 36000,
            "endCourseAt": "2022-01-10T14:06:55.441Z",
            "beginDate": "2022-01-10T14:06:55.441Z",
            "dueDate": "2022-01-10T14:06:55.441Z",
            "createdAt": "2022-01-10T14:06:55.441Z",
            "updatedAt": "2022-01-10T14:06:55.441Z"
        }
    ]));
};