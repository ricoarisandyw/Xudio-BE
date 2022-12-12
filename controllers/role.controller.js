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
const IRole_1 = __importDefault(require("../src/entity/IRole"));
const IUserInRole_1 = __importDefault(require("../src/entity/IUserInRole"));
const response_builder_1 = require("../utils/response-builder");
class RoleController {
}
exports.default = RoleController;
_a = RoleController;
RoleController.addRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield IRole_1.default.create(payload).save();
    res.json((0, response_builder_1.success)("Successfully add role", result));
});
RoleController.addUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (yield IUserInRole_1.default.findOneBy({
        idRole: payload.idRole,
        idUser: payload.idUser
    })) {
        const result = yield IUserInRole_1.default.create(payload).save();
        res.json((0, response_builder_1.success)("Successfully add user role", result));
    }
    else {
        res.json((0, response_builder_1.failed)("This user already added role"));
    }
});
RoleController.getUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield IUserInRole_1.default.findBy({
        idUser: payload.idUser
    });
    const role = yield IRole_1.default.findBy({
        id: (0, typeorm_1.In)(result.map((v) => v.idRole))
    });
    res.json((0, response_builder_1.success)("Successfully get user role", role));
});
RoleController.get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield IUserInRole_1.default.findBy({
        idUser: payload.idUser
    });
    res.json((0, response_builder_1.success)("Successfully add role", result));
});
