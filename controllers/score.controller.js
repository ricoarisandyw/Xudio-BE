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
const jwt_util_1 = require("../utils/jwt-util");
const prisma_util_1 = __importDefault(require("../utils/prisma-util"));
const response_builder_1 = require("../utils/response-builder");
class ScoreController {
}
exports.default = ScoreController;
_a = ScoreController;
ScoreController.getScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization || "";
    const iduser = (0, jwt_util_1.getIdFromJWT)(authorization.replace("Bearer ", ""));
    const allScores = yield prisma_util_1.default.user_in_course.findMany({
        where: {
            iduser: +iduser
        }
    });
    const courses = yield prisma_util_1.default.course.findMany({
        where: {
            id: {
                in: allScores.map(score => score.idcourse)
            }
        }
    });
    // agregate
    const scores = allScores.reduce((acc, cur) => {
        const course = courses.find((course) => cur.idcourse === course.id);
        acc.push({
            name: course === null || course === void 0 ? void 0 : course.name,
            description: course === null || course === void 0 ? void 0 : course.description,
            score: cur.score,
            beginDate: course === null || course === void 0 ? void 0 : course.begindate,
            dueDate: course === null || course === void 0 ? void 0 : course.duedate,
            startCourse: cur.startcourse,
            endCourse: cur.endcourse,
        });
        return acc;
    }, []);
    res.send((0, response_builder_1.success)("Get Score", scores));
});
ScoreController.addScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const authorization = req.headers.authorization || "";
    const iduser = (0, jwt_util_1.getIdFromJWT)(authorization.replace('Bearer ', ''));
    const course = yield prisma_util_1.default.user_in_course.findFirst({
        where: {
            idcourse: +payload.courseID,
            iduser: +iduser
        }
    });
    if (course) {
        const result = yield prisma_util_1.default.user_in_course.update({
            where: {
                id: course.id
            },
            data: {
                score: payload.score
            }
        });
        res.send((0, response_builder_1.success)("Successfully add score", result));
    }
    else {
        res.send((0, response_builder_1.failed)("Failed to add score", {}));
    }
});
