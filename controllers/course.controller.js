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
const IUserInCourse_1 = __importDefault(require("../src/entity/IUserInCourse"));
const jwt_util_1 = require("../utils/jwt-util");
const response_builder_1 = require("../utils/response-builder");
class CourseController {
}
exports.default = CourseController;
_a = CourseController;
CourseController.deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCourse } = req.params;
    try {
        new ICourse_1.ICourse();
        return res.json((0, response_builder_1.success)("Sucess", { message: "Course deleted" }));
    }
    catch (error) {
        return res.json((0, response_builder_1.failed)("Failed", { message: "Error deleting course" }));
    }
});
CourseController.getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.idCourse);
    const course = yield ICourse_1.ICourse.findOne({
        where: {
            id: +req.params.idCourse
        }
    });
    res.send((0, response_builder_1.success)("Successfully get course", course));
});
CourseController.getAllCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield ICourse_1.ICourse.find();
    res.send((0, response_builder_1.success)("Successfully get all course", courses));
});
CourseController.startCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization || "";
    const idUser = (0, jwt_util_1.getIdFromJWT)(authorization.replace('Bearer ', ''));
    const { idCourse } = req.params;
    // check existing
    const userInCourse = yield IUserInCourse_1.default.findOneBy({
        idUser: +idUser,
        idCourse: +idCourse
    });
    if (userInCourse) {
        res.send((0, response_builder_1.failed)("Failed to start course", { message: "User already in course" }));
    }
    else {
        const createResponse = yield IUserInCourse_1.default.create({
            idUser: +idUser,
            idCourse: +idCourse,
            startCourse: new Date(),
            score: 0,
        }).save();
        res.send((0, response_builder_1.success)("Start Course", createResponse));
    }
});
CourseController.endCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization || "";
    const iduser = (0, jwt_util_1.getIdFromJWT)(authorization.replace('Bearer ', ''));
    const { score } = req.body;
    const userInCourse = yield IUserInCourse_1.default.findOne({
        where: {
            idUser: +iduser,
            idCourse: +req.params.idCourse
        }
    });
    console.log("User in Course", userInCourse);
    if (userInCourse && userInCourse.id) {
        const updateResult = yield IUserInCourse_1.default.update(userInCourse === null || userInCourse === void 0 ? void 0 : userInCourse.id, {
            score: +score,
            endCourse: new Date()
        });
        res.send((0, response_builder_1.success)("End Course", updateResult));
    }
    else {
        res.send((0, response_builder_1.failed)("user not found"));
    }
});
CourseController.upload = (req, res) => {
    res.send((0, response_builder_1.success)("Upload", {
        "courseId": "122",
        "fileName": "admin",
        "fileURL": "www.oke.co/ini_gambar.png",
    }));
};
CourseController.createOrUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    console.log("Payload", payload);
    try {
        if (payload.id) {
            const result = yield ICourse_1.ICourse.update(payload.id, Object.assign({}, payload));
            res.send((0, response_builder_1.success)("Successfully update course", result));
        }
        else {
            const result = yield ICourse_1.ICourse.create(Object.assign({}, payload)).save();
            res.send((0, response_builder_1.success)('Create course', result));
        }
    }
    catch (error) {
        console.log(error);
        res.send((0, response_builder_1.failed)('Something wrong', {
            message: error.message
        }));
    }
});
