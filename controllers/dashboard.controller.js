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
const ICourse_1 = require("../src/entity/ICourse");
const IRoom_1 = __importDefault(require("../src/entity/IRoom"));
const IUser_1 = __importDefault(require("../src/entity/IUser"));
const response_builder_1 = require("../utils/response-builder");
class DashboardController {
}
exports.default = DashboardController;
_a = DashboardController;
DashboardController.getActiveRoom = () => {
    return IRoom_1.default.countBy({
        status: "ACTIVE"
    });
};
DashboardController.getUsers = () => {
    return IUser_1.default.count();
};
DashboardController.getCourses = () => {
    return ICourse_1.ICourse.count();
};
DashboardController.getDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Promise.all([
        _a.getActiveRoom(),
        _a.getUsers(),
        _a.getCourses(),
    ]).then(([rooms, users, courses]) => {
        res.send((0, response_builder_1.success)("Successfully get dashboard data", {
            activeRoom: rooms,
            activeUser: users,
            activeCourse: courses
        }));
    });
});
