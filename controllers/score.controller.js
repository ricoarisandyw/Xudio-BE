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
const IUserInCourse_1 = __importDefault(require("../src/entity/IUserInCourse"));
const jwt_util_1 = require("../utils/jwt-util");
const response_builder_1 = require("../utils/response-builder");
class ScoreController {
}
exports.default = ScoreController;
_a = ScoreController;
ScoreController.getScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization || "";
    const iduser = (0, jwt_util_1.getIdFromJWT)(authorization.replace("Bearer ", ""));
    const course = yield IUserInCourse_1.default.findOneBy({
        idUser: +iduser,
        idCourse: req.body.idCourse,
    });
    res.send((0, response_builder_1.success)("Successfully Get Score", course));
});
ScoreController.addScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const authorization = req.headers.authorization || "";
    // * id user is payload because admin / system who made it.
    // const iduser = getIdFromJWT(authorization.replace('Bearer ', ''))
    const course = yield IUserInCourse_1.default.findOne({
        where: {
            idCourse: payload.idCourse,
            idUser: payload.idUser
        }
    });
    if (course) {
        const result = yield IUserInCourse_1.default.update({
            id: course.id
        }, {
            score: payload.score
        });
        res.send((0, response_builder_1.success)("Successfully add score", result));
    }
    else {
        res.send((0, response_builder_1.failed)("Failed to add score", {}));
    }
});
