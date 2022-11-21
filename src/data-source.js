"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const ICourse_1 = require("./entity/ICourse");
const ILesson_1 = require("./entity/ILesson");
const IRoom_1 = __importDefault(require("./entity/IRoom"));
const ITeacher_1 = __importDefault(require("./entity/ITeacher"));
const ITeacherInRoom_1 = __importDefault(require("./entity/ITeacherInRoom"));
const IUser_1 = __importDefault(require("./entity/IUser"));
const IUserDetail_1 = __importDefault(require("./entity/IUserDetail"));
const IUserInCourse_1 = __importDefault(require("./entity/IUserInCourse"));
const IUserInRoom_1 = require("./entity/IUserInRoom");
const IVideo_1 = __importDefault(require("./entity/IVideo"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "cockroachdb",
    url: "postgresql://xudio_official:ApJ54_pwiOzPN-OK_wJLOw@free-tier8.aws-ap-southeast-1.cockroachlabs.cloud:26257/xudio2",
    entities: [ICourse_1.ICourse, IUser_1.default, IVideo_1.default, IUserInCourse_1.default, IUserDetail_1.default, IRoom_1.default, IUserInRoom_1.IUserInRoom, ILesson_1.ILesson, ITeacher_1.default, ITeacherInRoom_1.default],
    migrations: ["src/migrations/*"],
    ssl: true,
    extra: {
        options: "--cluster=pocket-boxer-2250",
        application_name: "docs_simplecrud_typeorm"
    },
});
