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
const IUserInCourse_1 = __importDefault(require("../src/entity/IUserInCourse"));
const jwt_util_1 = require("../utils/jwt-util");
const response_builder_1 = require("../utils/response-builder");
class CourseController {
}
exports.default = CourseController;
_a = CourseController;
CourseController.getRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idCourse } = req.params;
        const rooms = yield IRoom_1.default.findBy({
            idCourse: +idCourse
        });
        res.send((0, response_builder_1.success)("Successfully get rooms", rooms));
    }
    catch (e) {
        res.status(500).send(e);
    }
});
CourseController.joinCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCourse } = req.params;
    const { idUser } = req.body;
    try {
        // prevent join again
        const existing = yield IUserInCourse_1.default.findOneBy({
            idUser: idUser,
            idCourse: +idCourse
        });
        if (existing) {
            return res.json((0, response_builder_1.failed)("User already join this course"));
        }
        else {
            const newData = new IUserInCourse_1.default();
            newData.idCourse = +idCourse;
            newData.idUser = +idUser;
            newData.score = 0;
            const result = yield newData.save();
            return res.json((0, response_builder_1.success)("Successfully join course", result));
        }
    }
    catch (e) {
        console.log({ e });
        return res.json((0, response_builder_1.failed)("Failed", { message: "Failed to join course, " + e }));
    }
});
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
    const detailCourse = Object.assign(Object.assign({}, course), { rooms: yield IRoom_1.default.findBy({
            idCourse: course === null || course === void 0 ? void 0 : course.id
        }) });
    res.send((0, response_builder_1.success)("Successfully get course", detailCourse));
});
CourseController.getUsersInCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const all = yield IUserInCourse_1.default.find();
    console.log({ all });
    const course = yield IUserInCourse_1.default.findBy({
        idCourse: +req.params.idCourse
    });
    res.send((0, response_builder_1.success)("Successfully get course", course));
});
CourseController.getAllCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield ICourse_1.ICourse.find();
    const mappedCourses = yield Promise.all(courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
        return Object.assign(Object.assign({}, course), { roomSize: yield IRoom_1.default.countBy({
                idCourse: +course.id
            }) });
    })));
    res.send((0, response_builder_1.success)("Successfully get all course", mappedCourses));
});
CourseController.startCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization || "";
    const idUser = (0, jwt_util_1.getIdFromJWT)(authorization.replace('Bearer ', ''));
    const { idCourse } = req.params;
    const existing = yield IUserInCourse_1.default.findOneBy({
        idUser: +idUser,
        idCourse: +idCourse
    });
    if (existing) {
        existing.startCourse = new Date();
        existing.save();
        res.send((0, response_builder_1.success)("Successfully start course", existing));
    }
    else {
        res.send((0, response_builder_1.failed)("User not exist in that course"));
    }
});
CourseController.endCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization || "";
    const idUser = (0, jwt_util_1.getIdFromJWT)(authorization.replace('Bearer ', ''));
    const { idCourse } = req.params;
    const existing = yield IUserInCourse_1.default.findOneBy({
        idUser: +idUser,
        idCourse: +idCourse
    });
    if (existing) {
        existing.endCourse = new Date();
        existing.save();
        res.send((0, response_builder_1.success)("Successfully end course", existing));
    }
    else {
        res.send((0, response_builder_1.failed)("User not exist in that course"));
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
